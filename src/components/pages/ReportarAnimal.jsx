import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LuMapPin, LuSave, LuCircleAlert, LuSearch } from "react-icons/lu";
import { reportarAnimalEncontrado } from "../../services/foundAnimalService";
import { auth } from "../../firebase";
import "./Pages.css";

const especies = ["Perro", "Gato", "Ave", "Conejo", "Otro"];
const estados = ["Buen estado", "Herido", "Enfermo", "Muy débil"];

function ReportarAnimal() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [exito, setExito] = useState(false);
  
  const [form, setForm] = useState({
    especie: "Perro",
    color: "",
    tamano: "",
    descripcionVisual: "",
    estadoAnimal: "Buen estado",
    direccionHallazgo: "",
    referenciaUbicacion: "",
    barrio: "",
    ciudad: "",
    notasAdicionales: "",
    fotoUrl: "",
    nombreReportador: "",
    telefonoReportador: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    try {
      const user = auth.currentUser;
      await reportarAnimalEncontrado({
        ...form,
        nombreReportador: form.nombreReportador || (user ? user.email : "Anónimo"),
        tieneDuenoConocido: false
      });
      setExito(true);
      setTimeout(() => navigate("/animales-encontrados"), 2000);
    } catch {
      setError("Error al enviar el reporte. Intenta de nuevo.");
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
            <LuSearch className="success-icon success-icon--blue" />
            <h2>¡Reporte Enviado!</h2>
            <p>Gracias por reportar un animal encontrado. Tu ayuda es importante.</p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="page-section">
      <div className="page-card page-card--wide">
        <div className="page-header">
          <LuSearch className="page-header__icon page-header__icon--blue" />
          <h2>Reportar Animal Encontrado</h2>
          <p className="page-subtitle">
            Si encontraste un animal en estado de abandono, registra su información aquí
          </p>
        </div>

        <form onSubmit={handleSubmit} className="page-form">
          <div className="form-section">
            <h3 className="form-section__title">
              <span className="form-section__number">1</span>
              Información del Animal
            </h3>
            
            <div className="form-grid">
              <div className="form-group">
                <label>Especie *</label>
                <select name="especie" value={form.especie} onChange={handleChange} required>
                  {especies.map(e => (
                    <option key={e} value={e}>{e}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Color *</label>
                <input
                  type="text"
                  name="color"
                  value={form.color}
                  onChange={handleChange}
                  placeholder="Color o colores principales"
                  required
                />
              </div>

              <div className="form-group">
                <label>Tamaño aproximado</label>
                <select name="tamano" value={form.tamano} onChange={handleChange}>
                  <option value="">Seleccionar</option>
                  <option value="Pequeño">Pequeño</option>
                  <option value="Mediano">Mediano</option>
                  <option value="Grande">Grande</option>
                </select>
              </div>

              <div className="form-group">
                <label>Estado del Animal *</label>
                <select name="estadoAnimal" value={form.estadoAnimal} onChange={handleChange} required>
                  {estados.map(e => (
                    <option key={e} value={e}>{e}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Descripción Visual *</label>
              <textarea
                name="descripcionVisual"
                value={form.descripcionVisual}
                onChange={handleChange}
                placeholder="Describe la apariencia: tamaño, color, pelaje, orejas, marca, collar, etc."
                rows="3"
                required
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
          </div>

          <div className="form-section">
            <h3 className="form-section__title">
              <span className="form-section__number">2</span>
              Ubicación del Hallazgo
            </h3>
            
            <div className="form-group">
              <label>Dirección *</label>
              <div className="input-with-icon">
                <LuMapPin />
                <input
                  type="text"
                  name="direccionHallazgo"
                  value={form.direccionHallazgo}
                  onChange={handleChange}
                  placeholder="Calle principal y número"
                  required
                />
              </div>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label>Barrio / Zona</label>
                <input
                  type="text"
                  name="barrio"
                  value={form.barrio}
                  onChange={handleChange}
                  placeholder="Barrio o zona"
                />
              </div>

              <div className="form-group">
                <label>Ciudad *</label>
                <input
                  type="text"
                  name="ciudad"
                  value={form.ciudad}
                  onChange={handleChange}
                  placeholder="Ciudad"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Referencia de Ubicación</label>
              <input
                type="text"
                name="referenciaUbicacion"
                value={form.referenciaUbicacion}
                onChange={handleChange}
                placeholder="Ej: frente al parque, cerca del mercado, etc."
              />
            </div>
          </div>

          <div className="form-section">
            <h3 className="form-section__title">
              <span className="form-section__number">3</span>
              Información del Reportador
            </h3>
            
            <div className="form-grid">
              <div className="form-group">
                <label>Tu nombre</label>
                <input
                  type="text"
                  name="nombreReportador"
                  value={form.nombreReportador}
                  onChange={handleChange}
                  placeholder="Tu nombre (opcional)"
                />
              </div>

              <div className="form-group">
                <label>Teléfono de contacto</label>
                <input
                  type="tel"
                  name="telefonoReportador"
                  value={form.telefonoReportador}
                  onChange={handleChange}
                  placeholder="Tu teléfono (opcional)"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Notas Adicionales</label>
              <textarea
                name="notasAdicionales"
                value={form.notasAdicionales}
                onChange={handleChange}
                placeholder="Cualquier información adicional relevante"
                rows="2"
              />
            </div>
          </div>

          {error && (
            <div className="form-error">
              <LuCircleAlert /> {error}
            </div>
          )}

          <button type="submit" className="button page-button page-button--blue" disabled={loading}>
            <LuSave />
            {loading ? "Enviando..." : "Enviar Reporte"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default ReportarAnimal;
