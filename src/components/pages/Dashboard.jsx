import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { 
  LuPawPrint, LuSearch, LuPlus, LuUser,
  LuTriangleAlert, LuLogOut, LuBell, LuBellOff
} from "react-icons/lu";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { obtenerMisMascotas } from "../../services/petService";
import { obtenerMisReportes } from "../../services/foundAnimalService";
import { useNotificacionesPush } from "../../hooks/useNotificacionesPush";
import DashboardCharts from "./DashboardCharts";
import "./Pages.css";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({ mascotas: 0, reportes: 0 });
  const { permiso, solicitarPermiso } = useNotificacionesPush();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        async function cargarEstadisticas() {
          try {
            const [mascotas, reportes] = await Promise.all([
              obtenerMisMascotas(),
              obtenerMisReportes()
            ]);
            setStats({ mascotas: mascotas.length, reportes: reportes.length });
          } catch (err) {
            console.error("Error al cargar estadísticas:", err);
          }
        }
        cargarEstadisticas();
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error("Error al cerrar sesión:", err);
    }
  };

  const handleNotificacion = async () => {
    if (permiso !== "granted") {
      const result = await solicitarPermiso();
      if (result) {
        toast.success("Notificaciones activadas correctamente");
      } else {
        toast.warning("No se pudieron activar las notificaciones");
      }
    } else {
      toast.info("Las notificaciones ya están activadas");
    }
  };

  if (!user) {
    return (
      <section className="page-section">
        <div className="page-card">
          <div className="page-empty">
            <LuUser className="page-empty__icon" />
            <h2>Bienvenido a PetSOS</h2>
            <p>Inicia sesión para acceder a tu panel de control</p>
            <Link to="/login" className="button page-button">Iniciar Sesión</Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="page-section">
      <div className="page-container">
        <div className="page-header">
          <h2>
            <LuUser className="page-header__icon" />
            Mi Panel
          </h2>
          <p className="page-subtitle">Gestiona tus mascotas y reportes</p>
        </div>

        <div className="dashboard-user">
          <div className="dashboard-user__avatar">
            <LuUser />
          </div>
          <div className="dashboard-user__info">
            <h3>{user.email}</h3>
            <span>Miembro de PetSOS</span>
          </div>
          <div className="dashboard-user__actions">
            <button
              className={`button ${permiso === "granted" ? "button--outline" : "button--primary-small"}`}
              onClick={handleNotificacion}
              title={permiso === "granted" ? "Notificaciones activadas" : "Activar notificaciones"}
            >
              {permiso === "granted" ? <LuBell /> : <LuBellOff />}
              {permiso === "granted" ? "Notificaciones" : "Activar Alertas"}
            </button>
            <button className="button button--outline" onClick={handleLogout}>
              <LuLogOut /> Cerrar Sesión
            </button>
          </div>
        </div>

        <div className="stats-grid">
          <motion.div 
            className="stat-card"
            whileHover={{ scale: 1.02 }}
          >
            <div className="stat-card__icon stat-card__icon--primary">
              <LuPawPrint />
            </div>
            <div className="stat-card__info">
              <span className="stat-card__number">{stats.mascotas}</span>
              <span className="stat-card__label">Mascotas Registradas</span>
            </div>
          </motion.div>

          <motion.div 
            className="stat-card"
            whileHover={{ scale: 1.02 }}
          >
            <div className="stat-card__icon stat-card__icon--warning">
              <LuSearch />
            </div>
            <div className="stat-card__info">
              <span className="stat-card__number">{stats.reportes}</span>
              <span className="stat-card__label">Animales Reportados</span>
            </div>
          </motion.div>
        </div>

        <DashboardCharts stats={stats} />

        <div className="actions-grid">
          <Link to="/registrar-mascota" className="action-card">
            <div className="action-card__icon action-card__icon--primary">
              <LuPlus />
            </div>
            <h3>Registrar Mascota</h3>
            <p>Agrega una nueva mascota a tu perfil</p>
          </Link>

          <Link to="/mis-mascotas" className="action-card">
            <div className="action-card__icon action-card__icon--secondary">
              <LuPawPrint />
            </div>
            <h3>Ver Mis Mascotas</h3>
            <p>Consulta y gestiona tus mascotas registradas</p>
          </Link>

          <Link to="/reportar-animal" className="action-card">
            <div className="action-card__icon action-card__icon--warning">
              <LuSearch />
            </div>
            <h3>Reportar Animal</h3>
            <p>Reporta un animal encontrado en la calle</p>
          </Link>

          <Link to="/animales-encontrados" className="action-card">
            <div className="action-card__icon action-card__icon--danger">
              <LuTriangleAlert />
            </div>
            <h3>Animales Encontrados</h3>
            <p>Ve los animales reportados por la comunidad</p>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
