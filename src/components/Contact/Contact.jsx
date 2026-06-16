import "./Contact.css";

function Contact() {
  return (
    <section id="contacto" className="contact-section">

      <div className="container contact__wrapper">

        <div className="contact__form">

          <h2>¿Tienes preguntas? Escríbenos</h2>

          <form>

            <input type="text" placeholder="Nombre" />

            <input type="email" placeholder="Correo" />

            <input type="tel" placeholder="Celular" />

            <textarea placeholder="Observaciones"></textarea>

            <label className="checkbox-label">
              <input type="checkbox" />
              Acepto términos y condiciones
            </label>

            <button className="button">
              Enviar
            </button>

          </form>

        </div>

        <div className="contact__map">

          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.7914484515727!2d-78.4919116242656!3d-0.2102860353982151"
            title="mapa"
          ></iframe>

        </div>

      </div>

    </section>
  );
}

export default Contact;