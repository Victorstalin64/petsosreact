import "./About.css";
import abandono from "../../assets/images/abandono.webp";

function About() {
  return (
    <section id="nosotros" className="about">

      <div className="container about__container">

        <div className="about__text">
          <h2>Sobre Nosotros</h2>

          <p>
            Somos un equipo apasionado por la tecnología y el bienestar animal.
          </p>

          <p>
            Con PetSOS, ayudamos a los dueños de mascotas a encontrar servicios,
            recibir alertas y conectarse con su comunidad.
          </p>
        </div>

        <div className="about__image">
          <img src={abandono} alt="Cuidado animal" width="825" height="510" loading="lazy" />
        </div>

      </div>

    </section>
  );
}

export default About;