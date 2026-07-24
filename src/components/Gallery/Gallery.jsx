import "./Gallery.css";

import busqueda from "../../assets/images/Busqueda.webp";
import mapa from "../../assets/images/Mapa.webp";
import alarma from "../../assets/images/Alarma.webp";
import comunidad from "../../assets/images/Comunidad.webp";

function Gallery() {
  return (
    <section id="galeria" className="gallery">

      <div className="container">

        <h2 className="section__title">Galería</h2>

        <div className="gallery__grid">

          <div className="gallery__item">
            <img src={busqueda} alt="" width="360" height="480" loading="lazy" />
          </div>

          <div className="gallery__item">
            <img src={mapa} alt="" width="225" height="225" loading="lazy" />
          </div>

          <div className="gallery__item">
            <img src={alarma} alt="" width="500" height="500" loading="lazy" />
          </div>

          <div className="gallery__item">
            <img src={comunidad} alt="" width="1200" height="675" loading="lazy" />
          </div>

        </div>

      </div>

    </section>
  );
}

export default Gallery;