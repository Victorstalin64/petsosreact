import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../firebase";
import { FcGoogle } from "react-icons/fc";
import "./Auth.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
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
      navigate("/");
    } catch (err) {
      if (err.code !== "auth/popup-closed-by-user") {
        setError("Error al iniciar sesión con Google. Intenta de nuevo.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth-section">
      <div className="auth-card">
        <h2>Iniciar sesión</h2>
        <p className="auth-subtitle">Bienvenido de nuevo a PetSOS</p>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
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
