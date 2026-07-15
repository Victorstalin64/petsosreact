import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LuPawPrint, LuSave, LuCircleAlert } from "react-icons/lu";
import { registrarMascota } from "../../services/petService";
import "./Pages.css";

const especies = ["Perro", "Gato", "Ave", "Conejo", "Hamster", "Otro"];
const sexos = ["Macho", "Hembra"];

function RegistrarMascota() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [exito, setExito] = useState(false);
  
  const [form, setForm] = useState({
    nombre: "",
    especie: "Perro",
    raza: "",
    edad: "",
    sexo: "Macho",
    color: "",
    tamano: "",
    peso: "",
    descripcionFisica: "",
    enfermedades: "",
    vacunas: "",
    esterilizado: false,
    caracteristicas: "",
    fotoUrl: ""
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    try {
      await registrarMascota(form);
      setExito(true);
      setTimeout(() => navigate("/mis-mascotas"), 2000);
    } catch {
      setError("Error al registrar la mascota. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  if (exito) {
    return (
      <section className="page-section">
        <div className="page-card">
          <motion.div 
            className="success-message"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <LuPawPrint className="success-icon" />
            <h2>¡Mascota Registrada!</h2>
            <p>Tu mascota ha sido registrada exitosamente.</p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="page-section">
      <div className="page-card page-card--wide">
        <div className="page-header">
          <LuPawPrint className="page-header__icon" />
          <h2>Registrar Mascota</h2>
          <p className="page-subtitle">Registra la información completa de tu mascota</p>
        </div>

        <form onSubmit={handleSubmit} className="page-form">
          <div className="form-grid">
            <div className="form-group">
              <label>Nombre *</label>
              <input
                type="text"
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                placeholder="Nombre de la mascota"
                required
              />
            </div>

            <div className="form-group">
              <label>Especie *</label>
              <select name="especie" value={form.especie} onChange={handleChange} required>
                {especies.map(e => (
                  <option key={e} value={e}>{e}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Raza</label>
              <input
                type="text"
                name="raza"
                value={form.raza}
                onChange={handleChange}
                placeholder="Raza (si aplica)"
              />
            </div>

            <div className="form-group">
              <label>Edad (años)</label>
              <input
                type="number"
                name="edad"
                value={form.edad}
                onChange={handleChange}
                placeholder="Edad aproximada"
                min="0"
                max="30"
              />
            </div>

            <div className="form-group">
              <label>Sexo *</label>
              <select name="sexo" value={form.sexo} onChange={handleChange} required>
                {sexos.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Color</label>
              <input
                type="text"
                name="color"
                value={form.color}
                onChange={handleChange}
                placeholder="Color principal"
              />
            </div>

            <div className="form-group">
              <label>Tamaño</label>
              <select name="tamano" value={form.tamano} onChange={handleChange}>
                <option value="">Seleccionar</option>
                <option value="Pequeño">Pequeño</option>
                <option value="Mediano">Mediano</option>
                <option value="Grande">Grande</option>
              </select>
            </div>

            <div className="form-group">
              <label>Peso (kg)</label>
              <input
                type="number"
                name="peso"
                value={form.peso}
                onChange={handleChange}
                placeholder="Peso aproximado"
                min="0"
                step="0.1"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Descripción Física</label>
            <textarea
              name="descripcionFisica"
              value={form.descripcionFisica}
              onChange={handleChange}
              placeholder="Describe apariencia física: manchas, tipo de pelaje, orejas, cola, etc."
              rows="3"
            />
          </div>

          <div className="form-group">
            <label>Enfermedades o Condiciones</label>
            <textarea
              name="enfermedades"
              value={form.enfermedades}
              onChange={handleChange}
              placeholder="Describe enfermedades, alergias o condiciones de salud"
              rows="2"
            />
          </div>

          <div className="form-group">
            <label>Vacunas</label>
            <textarea
              name="vacunas"
              value={form.vacunas}
              onChange={handleChange}
              placeholder="Lista de vacunas aplicadas"
              rows="2"
            />
          </div>

          <div className="form-group">
            <label>Características Adicionales</label>
            <textarea
              name="caracteristicas"
              value={form.caracteristicas}
              onChange={handleChange}
              placeholder="Comportamiento, hábitos, preferencias, etc."
              rows="2"
            />
          </div>

          <div className="form-group">
            <label>URL de Foto (opcional)</label>
            <input
              type="url"
              name="fotoUrl"
              value={form.fotoUrl}
              onChange={handleChange}
              placeholder="https://ejemplo.com/foto.jpg"
            />
          </div>

          <div className="form-group form-group--checkbox">
            <label>
              <input
                type="checkbox"
                name="esterilizado"
                checked={form.esterilizado}
                onChange={handleChange}
              />
              Está esterilizado/a
            </label>
          </div>

          {error && (
            <div className="form-error">
              <LuCircleAlert /> {error}
            </div>
          )}

          <button type="submit" className="button page-button" disabled={loading}>
            <LuSave />
            {loading ? "Registrando..." : "Registrar Mascota"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default RegistrarMascota;
