// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "./assets/vite.svg";
// import heroImg from "./assets/hero.png";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Skills from "./pages/Skills";
import Experience from "./pages/Experience";
import Languages from "./pages/Languages";
import Contact from "./pages/Contact";
import Stelle from "./components/Stelle";
import Footer from "./components/Footer";
import Cursor from "./components/Cursor";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Cursor />
        <Header />
        <Stelle />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/languages" element={<Languages />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
