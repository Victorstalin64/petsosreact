import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import { 
  LuPawPrint, LuPlus, LuTrash2, 
  LuHeart, LuCalendar, LuX, LuFileDown
} from "react-icons/lu";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { MascotaPDF } from "./PdfDocuments";
import { obtenerMisMascotas, eliminarMascota } from "../../services/petService";
import { auth } from "../../firebase";
import "./Pages.css";

function MisMascotas() {
  const [mascotas, setMascotas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [mascotaSeleccionada, setMascotaSeleccionada] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        async function cargarMascotas() {
          try {
            const data = await obtenerMisMascotas();
            setMascotas(data);
          } catch (err) {
            console.error("Error al cargar mascotas:", err);
            setError(err.message || "Error al cargar las mascotas");
          } finally {
            setLoading(false);
          }
        }
        cargarMascotas();
      } else {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleEliminar = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este registro?")) {
      try {
        await eliminarMascota(id);
        setMascotas(prev => prev.filter(m => m.id !== id));
        setMascotaSeleccionada(null);
        toast.success("Mascota eliminada correctamente");
      } catch (err) {
        console.error("Error al eliminar mascota:", err);
        toast.error(err.message || "Error al eliminar");
      }
    }
  };

  if (!user) {
    return (
      <section className="page-section">
        <div className="page-card">
          <div className="page-empty">
            <LuPawPrint className="page-empty__icon" />
            <h2>Inicia sesión para ver tus mascotas</h2>
            <p>Debes estar registrado para gestionar tus mascotas</p>
            <Link to="/login" className="button page-button">Iniciar Sesión</Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="page-section">
      <div className="page-container">
        <div className="page-header page-header--row">
          <div>
            <h2>
              <LuPawPrint className="page-header__icon" />
              Mis Mascotas
            </h2>
            <p className="page-subtitle">Gestiona el registro de tus mascotas</p>
          </div>
          <Link to="/registrar-mascota" className="button page-button">
            <LuPlus /> Nueva Mascota
          </Link>
        </div>

        {error && <div className="form-error">{error}</div>}

        {loading ? (
          <div className="page-loading">Cargando...</div>
        ) : mascotas.length === 0 ? (
          <div className="page-card">
            <div className="page-empty">
              <LuPawPrint className="page-empty__icon" />
              <h2>No tienes mascotas registradas</h2>
              <p>Registra tu primera mascota para comenzar</p>
              <Link to="/registrar-mascota" className="button page-button">
                Registrar Mascota
              </Link>
            </div>
          </div>
        ) : (
          <div className="cards-grid">
            {mascotas.map((mascota, index) => (
              <motion.div
                key={mascota.id}
                className="pet-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                onClick={() => setMascotaSeleccionada(mascota)}
              >
                <div className="pet-card__header">
                  <div className="pet-card__avatar">
                    {mascota.fotoUrl ? (
                      <img src={mascota.fotoUrl} alt={mascota.nombre} />
                    ) : (
                      <LuPawPrint />
                    )}
                  </div>
                  <div className="pet-card__info">
                    <h3>{mascota.nombre}</h3>
                    <span className="pet-card__badge">{mascota.especie}</span>
                  </div>
                </div>
                
                <div className="pet-card__details">
                  {mascota.raza && <span><strong>Raza:</strong> {mascota.raza}</span>}
                  {mascota.edad && <span><strong>Edad:</strong> {mascota.edad} años</span>}
                  {mascota.sexo && <span><strong>Sexo:</strong> {mascota.sexo}</span>}
                  {mascota.color && <span><strong>Color:</strong> {mascota.color}</span>}
                </div>

                <div className="pet-card__footer">
                  <span className="pet-card__status">
                    <LuHeart /> Activo
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {mascotaSeleccionada && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMascotaSeleccionada(null)}
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
                onClick={() => setMascotaSeleccionada(null)}
              >
                <LuX />
              </button>
              
              <div className="modal-header">
                <div className="modal-avatar">
                  {mascotaSeleccionada.fotoUrl ? (
                    <img src={mascotaSeleccionada.fotoUrl} alt={mascotaSeleccionada.nombre} />
                  ) : (
                    <LuPawPrint />
                  )}
                </div>
                <h2>{mascotaSeleccionada.nombre}</h2>
                <span className="pet-card__badge">{mascotaSeleccionada.especie}</span>
              </div>

              <div className="modal-body">
                <div className="detail-grid">
                  {mascotaSeleccionada.raza && (
                    <div className="detail-item">
                      <LuPawPrint />
                      <span><strong>Raza:</strong> {mascotaSeleccionada.raza}</span>
                    </div>
                  )}
                  {mascotaSeleccionada.edad && (
                    <div className="detail-item">
                      <LuCalendar />
                      <span><strong>Edad:</strong> {mascotaSeleccionada.edad} años</span>
                    </div>
                  )}
                  {mascotaSeleccionada.sexo && (
                    <div className="detail-item">
                      <strong>Sexo:</strong> {mascotaSeleccionada.sexo}
                    </div>
                  )}
                  {mascotaSeleccionada.color && (
                    <div className="detail-item">
                      <strong>Color:</strong> {mascotaSeleccionada.color}
                    </div>
                  )}
                  {mascotaSeleccionada.tamano && (
                    <div className="detail-item">
                      <strong>Tamaño:</strong> {mascotaSeleccionada.tamano}
                    </div>
                  )}
                  {mascotaSeleccionada.peso && (
                    <div className="detail-item">
                      <strong>Peso:</strong> {mascotaSeleccionada.peso} kg
                    </div>
                  )}
                </div>

                {mascotaSeleccionada.descripcionFisica && (
                  <div className="detail-section">
                    <h4>Descripción Física</h4>
                    <p>{mascotaSeleccionada.descripcionFisica}</p>
                  </div>
                )}

                {mascotaSeleccionada.enfermedades && (
                  <div className="detail-section">
                    <h4>Enfermedades / Condiciones</h4>
                    <p>{mascotaSeleccionada.enfermedades}</p>
                  </div>
                )}

                {mascotaSeleccionada.vacunas && (
                  <div className="detail-section">
                    <h4>Vacunas</h4>
                    <p>{mascotaSeleccionada.vacunas}</p>
                  </div>
                )}

                {mascotaSeleccionada.caracteristicas && (
                  <div className="detail-section">
                    <h4>Características Adicionales</h4>
                    <p>{mascotaSeleccionada.caracteristicas}</p>
                  </div>
                )}

                {mascotaSeleccionada.esterilizado && (
                  <div className="detail-badge">
                    <LuHeart /> Esterilizado/a
                  </div>
                )}
              </div>

              <div className="modal-footer">
                <PDFDownloadLink
                  document={<MascotaPDF mascota={mascotaSeleccionada} />}
                  fileName={`ficha-${mascotaSeleccionada.nombre || "mascota"}.pdf`}
                  className="pdf-button"
                >
                  <LuFileDown /> Descargar Ficha
                </PDFDownloadLink>
                <button 
                  className="button button--danger"
                  onClick={() => handleEliminar(mascotaSeleccionada.id)}
                >
                  <LuTrash2 /> Eliminar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default MisMascotas;
