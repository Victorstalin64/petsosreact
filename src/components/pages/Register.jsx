import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
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
      setError("Las contraseñas no coinciden.");
      return;
    }
    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
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
      navigate("/");
    } catch (err) {
      if (err.code !== "auth/popup-closed-by-user") {
        setError("Error al registrarse con Google. Intenta de nuevo.");
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
