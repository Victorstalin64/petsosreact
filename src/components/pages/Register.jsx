import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { toast } from "react-toastify";
import { auth, googleProvider } from "../../firebase";
import { FcGoogle } from "react-icons/fc";
import "./Auth.css";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
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
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth-section">
      <div className="auth-card">
        <h2>Crear cuenta</h2>
        <p className="auth-subtitle">Únete a la comunidad PetSOS</p>
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
          <input
            type="password"
            placeholder="Confirmar contraseña"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
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
