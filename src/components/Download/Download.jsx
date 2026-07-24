import "./Download.css";

import appImage from "../../assets/images/phone-mockup.webp";
import playstore from "../../assets/images/playstore.webp";
import googleplay from "../../assets/images/googleplay.webp";

function Download() {
  return (
    <section id="app" className="download">
      <div className="container download__container">

        <div className="download__image">
          <img src={appImage} alt="App PetSOS" width="800" height="533" loading="lazy" />
        </div>

        <div className="download__info">
          <h2>Descarga la App PetSOS</h2>

          <p>
            Encuentra mascotas perdidas, recibe alertas y conecta con tu
            comunidad.
          </p>

          <div className="download__buttons">
            <a href="#">
              <img src={playstore} alt="App Store" width="258" height="258" loading="lazy" />
            </a>

            <a href="#">
              <img src={googleplay} alt="Google Play" width="292" height="292" loading="lazy" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Download;