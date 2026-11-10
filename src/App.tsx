import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages/Home";
import Exercicios from "./pages/Exercicios";
import Alimentacao from "./pages/Alimentacao";
import BemEstar from "./pages/BemEstar";
import Sobre from "./pages/Sobre";
import AdminReceitas from "./pages/AdminReceitas";
import Carteirinha from "./pages/Carteirinha";
import CalculadoraBemEstar from "./pages/CalculadoraBemEstar";

function AppRoutes() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  return (
    <div key={location.pathname} className="page-transition">
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/exercicios" element={<Exercicios />} />
        <Route path="/alimentacao" element={<Alimentacao />} />
        <Route path="/bem-estar" element={<BemEstar />} />
        <Route path="/calculadora" element={<CalculadoraBemEstar />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/carteirinha" element={<Carteirinha />} />
        <Route path="/admin/receitas" element={<AdminReceitas />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <Router basename="/CaminhosDoBemEstar">
      <AppRoutes />
    </Router>
  );
}
