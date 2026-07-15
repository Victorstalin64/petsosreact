import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { auth } from "../../firebase";
import "./Header.css";

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <motion.header
      className={`header ${scrolled ? "header--scrolled" : ""}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="container header__container">

        <h1 className="navbar__logo">
          Pet <span className="navbar__logo--primary">SOS</span>
        </h1>

        <nav className="nav">
          <ul className="nav__menu">
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/#nosotros">Nosotros</Link></li>
            <li><Link to="/servicios">Servicios</Link></li>
            <li><Link to="/animales-encontrados">Encontrados</Link></li>
            {user && (
              <>
                <li><Link to="/panel">Mi Panel</Link></li>
                <li><Link to="/mis-mascotas">Mis Mascotas</Link></li>
              </>
            )}
            <li>
              <motion.div
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.97 }}
              >
                {user ? (
                  <Link to="/panel" className="nav__login">
                    Mi Cuenta
                  </Link>
                ) : (
                  <Link to="/login" className="nav__login">
                    Acceso
                  </Link>
                )}
              </motion.div>
            </li>
          </ul>
        </nav>

      </div>
    </motion.header>
  );
}

export default Header;