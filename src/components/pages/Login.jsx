import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { toast } from "react-toastify";
import { auth, googleProvider } from "../../firebase";
import { FcGoogle } from "react-icons/fc";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import retrieverImg from "../../assets/images/Retriever.png";
import "./Auth.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Sesión iniciada correctamente");
      navigate("/");
    } catch (err) {
      setError(traducirError(err.code));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("Sesión iniciada con Google");
      navigate("/");
    } catch (err) {
      console.error("Error Google Login:", err.code, err.message);
      if (err.code === "auth/popup-closed-by-user") {
        // Usuario cerró el popup, no mostrar error
      } else if (err.code === "auth/popup-blocked") {
        setError("El navegador bloqueó la ventana emergente. Permita popups para este sitio.");
      } else if (err.code === "auth/operation-not-allowed") {
        setError("Google no está habilitado. Active el método de Google en Firebase Console > Authentication > Sign-in method.");
      } else if (err.code === "auth/unauthorized-domain") {
        setError("Dominio no autorizado. Agregue su dominio en Firebase Console > Authentication > Settings > Authorized domains.");
      } else if (err.code === "auth/network-request-failed") {
        setError("Error de red. Verifique su conexión a internet.");
      } else if (err.code === "auth/too-many-requests") {
        setError("Demasiados intentos. Espere unos minutos e intente de nuevo.");
      } else {
        setError(`Error: ${err.code} - ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth-section">
      <div className="auth-wrapper">
        <div
          className="auth-brand-panel"
          style={{ backgroundImage: `url(${retrieverImg})` }}
        >
          <div className="auth-brand-overlay">
            <p className="auth-brand-logo">
              Pet<span>SOS</span>
            </p>
            <h3>Bienvenido de nuevo</h3>
            <p>Inicia sesión y sigue ayudando a reunir mascotas con sus familias.</p>
          </div>
        </div>

        <div className="auth-card">
          <h2>Iniciar sesión</h2>
          <p className="auth-subtitle">Bienvenido de nuevo a PetSOS</p>
          <form onSubmit={handleSubmit}>
            <div className="auth-input-group">
              <FiMail className="auth-input-icon" />
              <input
                type="email"
                placeholder="Correo"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="auth-input-group">
              <FiLock className="auth-input-icon" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="auth-toggle-password"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                tabIndex={-1}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            {error && <p className="auth-error">{error}</p>}
            <button type="submit" className="button auth-button" disabled={loading}>
              {loading ? "Ingresando..." : "Ingresar"}
            </button>
          </form>

          <div className="auth-divider">
            <span>o continúa con</span>
          </div>

          <button
            type="button"
            className="auth-social-button"
            onClick={handleGoogleLogin}
            disabled={loading}
          >
            <FcGoogle className="auth-social-icon" />
            Google
          </button>

          <p className="auth-switch">
            ¿No tienes cuenta? <Link to="/registro">Regístrate</Link>
          </p>
        </div>
      </div>
    </section>
  );
}

function traducirError(code) {
  switch (code) {
    case "auth/invalid-email": return "El correo no es válido.";
    case "auth/user-not-found":
    case "auth/invalid-credential": return "Correo o contraseña incorrectos.";
    case "auth/wrong-password": return "Correo o contraseña incorrectos.";
    case "auth/too-many-requests": return "Demasiados intentos. Intenta más tarde.";
    default: return "Ocurrió un error. Intenta de nuevo.";
  }
}

export default Login;