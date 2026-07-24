import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { LuSun, LuMoon, LuMenu, LuX } from "react-icons/lu";
import { auth } from "../../firebase";
import "./Header.css";

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("petsos-theme") || "light";
  });

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

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("petsos-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === "light" ? "dark" : "light");
  };

  const closeMenu = () => setMenuOpen(false);

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

        <button
          className="nav__toggle"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
        >
          {menuOpen ? <LuX /> : <LuMenu />}
        </button>

        <nav className={`nav ${menuOpen ? "nav--open" : ""}`}>
          <ul className="nav__menu">
            <li><Link to="/" onClick={closeMenu}>Inicio</Link></li>
            <li><Link to="/#nosotros" onClick={closeMenu}>Nosotros</Link></li>
            <li><Link to="/servicios" onClick={closeMenu}>Servicios</Link></li>
            <li><Link to="/animales-encontrados" onClick={closeMenu}>Encontrados</Link></li>
            {user && (
              <>
                <li><Link to="/panel" onClick={closeMenu}>Mi Panel</Link></li>
                <li><Link to="/mis-mascotas" onClick={closeMenu}>Mis Mascotas</Link></li>
              </>
            )}
            <li>
              <motion.button
                className="theme-toggle"
                onClick={toggleTheme}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                title={theme === "light" ? "Modo oscuro" : "Modo claro"}
              >
                {theme === "light" ? <LuMoon /> : <LuSun />}
              </motion.button>
            </li>
            <li>
              <motion.div
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.97 }}
              >
                {user ? (
                  <Link to="/panel" className="nav__login" onClick={closeMenu}>
                    Mi Cuenta
                  </Link>
                ) : (
                  <Link to="/login" className="nav__login" onClick={closeMenu}>
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