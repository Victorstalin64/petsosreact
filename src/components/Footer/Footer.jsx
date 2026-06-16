import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">

      <div className="container footer__container">

        <div className="footer__social">

          <h3>Síguenos</h3>

          <div className="social__icons">
            <a href="#">FB</a>
            <a href="#">IG</a>
            <a href="#">TW</a>
          </div>

        </div>

        <div className="footer__links">

          <h3>Enlaces</h3>

          <ul>
            <li><a href="#">Soporte</a></li>
            <li><a href="#">FAQ</a></li>
          </ul>

        </div>

      </div>

      <hr />

      <p className="footer__copy">
        © Derechos Reservados - PetSOS
      </p>

    </footer>
  );
}

export default Footer;