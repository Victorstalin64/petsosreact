import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { toast } from "react-toastify";
import { auth, googleProvider } from "../../firebase";
import { FcGoogle } from "react-icons/fc";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import retrieverImg from "../../assets/images/Retriever.png";
import "./Auth.css";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      toast.warning("Las contraseñas no coinciden");
      return;
    }
    if (password.length < 6) {
      toast.warning("La contraseña debe tener al menos 6 caracteres");
      return;
    }
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success("Cuenta creada exitosamente");
      navigate("/");
    } catch (err) {
      setError(traducirError(err.code));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    setError("");
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("Cuenta creada con Google");
      navigate("/");
    } catch (err) {
<<<<<<< HEAD
      console.error("Google auth error:", err.code, err.message);
      if (err.code !== "auth/popup-closed-by-user") {
        setError("Error al registrarse con Google. Intenta de nuevo.");
=======
      console.error("Error Google Register:", err.code, err.message);
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
>>>>>>> 6842cec2b412608a5ad09df32ed22700122f071b
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
            <h3>Únete a la comunidad que ayuda a reunir mascotas con sus familias</h3>
            <p>Reporta, busca y encuentra animales perdidos cerca de ti.</p>
          </div>
        </div>

        <div className="auth-card">
          <h2>Crear cuenta</h2>
          <p className="auth-subtitle">Únete a la comunidad PetSOS</p>
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
            <div className="auth-input-group">
              <FiLock className="auth-input-icon" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirmar contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="auth-toggle-password"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                aria-label={showConfirmPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                tabIndex={-1}
              >
                {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            {error && <p className="auth-error">{error}</p>}
            <button type="submit" className="button auth-button" disabled={loading}>
              {loading ? "Creando cuenta..." : "Registrarme"}
            </button>
          </form>

          <div className="auth-divider">
            <span>o regístrate con</span>
          </div>

          <button
            type="button"
            className="auth-social-button"
            onClick={handleGoogleRegister}
            disabled={loading}
          >
            <FcGoogle className="auth-social-icon" />
            Google
          </button>

          <p className="auth-switch">
            ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
          </p>
        </div>
      </div>
    </section>
  );
}

function traducirError(code) {
  switch (code) {
    case "auth/email-already-in-use": return "Ese correo ya está registrado.";
    case "auth/invalid-email": return "El correo no es válido.";
    case "auth/weak-password": return "La contraseña es muy débil.";
    default: return "Ocurrió un error. Intenta de nuevo.";
  }
}

export default Register;