import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import { 
  LuSearch, LuMapPin, LuCalendar, LuPhone, 
  LuX, LuFilter, LuFileDown
} from "react-icons/lu";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { ReporteAnimalPDF } from "./PdfDocuments";
import { obtenerAnimalesEncontrados, actualizarReporte } from "../../services/foundAnimalService";
import "./Pages.css";

const especiesFiltro = ["Todas", "Perro", "Gato", "Ave", "Conejo", "Otro"];

function AnimalesEncontrados() {
  const [animales, setAnimales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [animalSeleccionado, setAnimalSeleccionado] = useState(null);
  const [filtroEspecie, setFiltroEspecie] = useState("Todas");

  useEffect(() => {
    async function cargarAnimales() {
      try {
        const data = await obtenerAnimalesEncontrados();
        setAnimales(data);
      } catch (err) {
        console.error("Error al cargar reportes:", err);
        setError(err.message || "Error al cargar los reportes");
      } finally {
        setLoading(false);
      }
    }
    cargarAnimales();
  }, []);

  const animalesFiltrados = filtroEspecie === "Todas" 
    ? animales 
    : animales.filter(a => a.especie === filtroEspecie);

  const handleContactar = (animal) => {
  if (!animal.telefonoReportador) {
    toast.warning("No hay número de contacto disponible");
    return;
  }

  toast.info("Abriendo marcador telefónico...");
  window.open(`tel:${animal.telefonoReportador}`, "_self");

  actualizarReporte(animal.id, { notificado: true }).catch((err) => {
    console.error("Error al marcar reporte como notificado:", err);
  });
};

  const formatDate = (timestamp) => {
    if (!timestamp) return "Fecha no disponible";
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString("es-EC", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
  };

  return (
    <section className="page-section">
      <div className="page-container">
        <div className="page-header page-header--row">
          <div>
            <h2>
              <LuSearch className="page-header__icon page-header__icon--blue" />
              Animales Encontrados
            </h2>
            <p className="page-subtitle">Animales reportados en estado de abandono</p>
          </div>
          <Link to="/reportar-animal" className="button page-button page-button--blue">
            <LuSearch /> Reportar Animal
          </Link>
        </div>

        <div className="filter-bar">
          <LuFilter />
          <span>Filtrar por:</span>
          {especiesFiltro.map(esp => (
            <button
              key={esp}
              className={`filter-btn ${filtroEspecie === esp ? "filter-btn--active" : ""}`}
              onClick={() => setFiltroEspecie(esp)}
            >
              {esp}
            </button>
          ))}
        </div>

        {error && <div className="form-error">{error}</div>}

        {loading ? (
          <div className="page-loading">Cargando reportes...</div>
        ) : animalesFiltrados.length === 0 ? (
          <div className="page-card">
            <div className="page-empty">
              <LuSearch className="page-empty__icon" />
              <h2>No hay animales reportados</h2>
              <p>Sé el primero en reportar un animal encontrado</p>
              <Link to="/reportar-animal" className="button page-button page-button--blue">
                Reportar Animal
              </Link>
            </div>
          </div>
        ) : (
          <div className="cards-grid">
            {animalesFiltrados.map((animal, index) => (
              <motion.div
                key={animal.id}
                className="pet-card pet-card--found"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                onClick={() => setAnimalSeleccionado(animal)}
              >
                <div className="pet-card__header">
                  <div className="pet-card__avatar pet-card__avatar--found">
                    {animal.fotoUrl ? (
                      <img src={animal.fotoUrl} alt="Animal encontrado" />
                    ) : (
                      <LuSearch />
                    )}
                  </div>
                  <div className="pet-card__info">
                    <span className="pet-card__badge pet-card__badge--warning">
                      {animal.especie}
                    </span>
                    <span className="pet-card__badge pet-card__badge--danger">
                      {animal.estadoAnimal}
                    </span>
                  </div>
                </div>
                
                <div className="pet-card__details">
                  {animal.color && <span><strong>Color:</strong> {animal.color}</span>}
                  {animal.tamano && <span><strong>Tamaño:</strong> {animal.tamano}</span>}
                  {animal.descripcionVisual && (
                    <span className="pet-card__desc">
                      {animal.descripcionVisual.substring(0, 80)}...
                    </span>
                  )}
                </div>

                <div className="pet-card__footer">
                  <span className="pet-card__location">
                    <LuMapPin /> {animal.ciudad || "Ubicación no especificada"}
                  </span>
                  <span className="pet-card__date">
                    <LuCalendar /> {formatDate(animal.fechaReporte)}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {animalSeleccionado && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setAnimalSeleccionado(null)}
          >
            <motion.div
              className="modal-content"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="modal-close"
                onClick={() => setAnimalSeleccionado(null)}
              >
                <LuX />
              </button>
              
              <div className="modal-header">
                <div className="modal-avatar modal-avatar--warning">
                  {animalSeleccionado.fotoUrl ? (
                    <img src={animalSeleccionado.fotoUrl} alt="Animal encontrado" />
                  ) : (
                    <LuSearch />
                  )}
                </div>
                <div className="modal-badges">
                  <span className="pet-card__badge pet-card__badge--warning">
                    {animalSeleccionado.especie}
                  </span>
                  <span className="pet-card__badge pet-card__badge--danger">
                    {animalSeleccionado.estadoAnimal}
                  </span>
                </div>
              </div>

              <div className="modal-body">
                <div className="detail-section">
                  <h4>
                    <LuSearch /> Descripción Visual
                  </h4>
                  <p>{animalSeleccionado.descripcionVisual}</p>
                </div>

                <div className="detail-grid">
                  {animalSeleccionado.color && (
                    <div className="detail-item">
                      <strong>Color:</strong> {animalSeleccionado.color}
                    </div>
                  )}
                  {animalSeleccionado.tamano && (
                    <div className="detail-item">
                      <strong>Tamaño:</strong> {animalSeleccionado.tamano}
                    </div>
                  )}
                </div>

                <div className="detail-section">
                  <h4>
                    <LuMapPin /> Ubicación del Hallazgo
                  </h4>
                  <p><strong>Dirección:</strong> {animalSeleccionado.direccionHallazgo}</p>
                  {animalSeleccionado.barrio && (
                    <p><strong>Barrio:</strong> {animalSeleccionado.barrio}</p>
                  )}
                  {animalSeleccionado.ciudad && (
                    <p><strong>Ciudad:</strong> {animalSeleccionado.ciudad}</p>
                  )}
                  {animalSeleccionado.referenciaUbicacion && (
                    <p><strong>Referencia:</strong> {animalSeleccionado.referenciaUbicacion}</p>
                  )}
                </div>

                {animalSeleccionado.notasAdicionales && (
                  <div className="detail-section">
                    <h4>Notas Adicionales</h4>
                    <p>{animalSeleccionado.notasAdicionales}</p>
                  </div>
                )}

                <div className="detail-section">
                  <h4>
                    <LuCalendar /> Fecha del Reporte
                  </h4>
                  <p>{formatDate(animalSeleccionado.fechaReporte)}</p>
                </div>
              </div>

              <div className="modal-footer">
                <PDFDownloadLink
                  document={<ReporteAnimalPDF animal={animalSeleccionado} />}
                  fileName={`reporte-animal-${animalSeleccionado.especie || "encontrado"}.pdf`}
                  className="pdf-button"
                >
                  <LuFileDown /> Descargar Reporte
                </PDFDownloadLink>
                {animalSeleccionado.telefonoReportador && (
                  <button 
                    className="button page-button page-button--green"
                    onClick={() => handleContactar(animalSeleccionado)}
                  >
                    <LuPhone /> Contactar
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default AnimalesEncontrados;
