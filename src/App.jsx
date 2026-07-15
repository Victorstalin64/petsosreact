import { Routes, Route } from "react-router-dom";
import ScrollToHash from "./components/ScrollToHash";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Services from "./components/Services/Services";
import Features from "./components/Features/Features";
import Download from "./components/Download/Download";
import Gallery from "./components/Gallery/Gallery";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import ServiciosPage from "./components/pages/ServiciosPage";
import Dashboard from "./components/pages/Dashboard";
import RegistrarMascota from "./components/pages/RegistrarMascota";
import MisMascotas from "./components/pages/MisMascotas";
import ReportarAnimal from "./components/pages/ReportarAnimal";
import AnimalesEncontrados from "./components/pages/AnimalesEncontrados";

function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Features />
      <Download />
      <Gallery />
      <Contact />
    </>
  );
}

function App() {
  return (
    <>
      <ScrollToHash />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Register />} />
        <Route path="/servicios" element={<ServiciosPage />} />
        <Route path="/panel" element={<Dashboard />} />
        <Route path="/registrar-mascota" element={<RegistrarMascota />} />
        <Route path="/mis-mascotas" element={<MisMascotas />} />
        <Route path="/reportar-animal" element={<ReportarAnimal />} />
        <Route path="/animales-encontrados" element={<AnimalesEncontrados />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
