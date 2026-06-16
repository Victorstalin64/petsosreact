import "./Header.css";

function Header() {
  return (
    <header className="header">
      <div className="container header__container">

        <h1 className="navbar__logo">
          Pet <span className="navbar__logo--primary">SOS</span>
        </h1>

        <nav className="nav">
          <ul className="nav__menu">
            <li><a href="#">Inicio</a></li>
            <li><a href="#nosotros">Nosotros</a></li>
            <li><a href="#servicios">Servicios</a></li>
            <li><a href="#app">App</a></li>
            <li><a href="#galeria">Galería</a></li>
            <li><a href="#contacto">Contacto</a></li>
            <li>
              <a href="#" className="nav__login">
                Acceso
              </a>
            </li>
          </ul>
        </nav>

      </div>
    </header>
  );
}

export default Header;