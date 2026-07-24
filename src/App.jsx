import { Suspense, lazy, useEffect } from "react";
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

// Estas páginas no se necesitan en la carga inicial: se cargan
// bajo demanda cuando el usuario navega a ellas.
const Login = lazy(() => import("./components/pages/Login"));
const Register = lazy(() => import("./components/pages/Register"));
const ServiciosPage = lazy(() => import("./components/pages/ServiciosPage"));
const Dashboard = lazy(() => import("./components/pages/Dashboard"));
const RegistrarMascota = lazy(() => import("./components/pages/RegistrarMascota"));
const MisMascotas = lazy(() => import("./components/pages/MisMascotas"));
const ReportarAnimal = lazy(() => import("./components/pages/ReportarAnimal"));
const AnimalesEncontrados = lazy(() => import("./components/pages/AnimalesEncontrados"));

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
  // Carga el widget de chat de Zapier solo cuando el usuario
  // hace scroll (o tras 5s como respaldo), en vez de siempre
  // al abrir la página.
  useEffect(() => {
    const cargarChat = () => {
      if (document.querySelector('script[src*="zapier-interfaces"]')) return;
      const script = document.createElement("script");
      script.type = "module";
      script.src = "https://interfaces.zapier.com/assets/web-components/zapier-interfaces/zapier-interfaces.esm.js";
      document.body.appendChild(script);
      const widget = document.createElement("zapier-interfaces-chatbot-embed");
      widget.setAttribute("is-popup", "true");
      widget.setAttribute("chatbot-id", "cmrm3e4py001tk9yaq62o7w94");
      document.body.appendChild(widget);
      window.removeEventListener("scroll", cargarChat);
    };
    window.addEventListener("scroll", cargarChat, { once: true, passive: true });
    const timer = setTimeout(cargarChat, 5000);
    return () => {
      window.removeEventListener("scroll", cargarChat);
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <ScrollToHash />
      <Header />
      <Suspense fallback={<div style={{ padding: "4rem", textAlign: "center" }}>Cargando...</div>}>
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
      </Suspense>
      <Footer />
    </>
  );
}

export default App;