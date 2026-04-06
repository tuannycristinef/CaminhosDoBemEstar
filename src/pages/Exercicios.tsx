import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import MobileFloatingIsland from "../components/MobileFloatingIsland";

export default function Exercicios() {
  return (
    <div className="w-full min-h-screen bg-gray-50 pt-24 font-sans md:pt-0">
      {/* Header */}
      <header className="relative hidden md:block">
        <div className="relative bg-gray-50 py-4 lg:py-6">
          <div className="absolute left-6 top-1/2 flex -translate-y-1/2 items-center md:left-8 lg:left-10">
            <Link to="/">
              <img src={logo} alt="Logo" className="h-12 w-12 cursor-pointer" />
            </Link>
          </div>
          <div className="mx-auto flex w-full max-w-7xl items-center justify-center px-2 md:px-4 lg:px-6">
            <nav className="flex flex-wrap justify-center gap-3 text-lg font-semibold text-purple-500 md:gap-6 md:text-xl lg:gap-12 lg:text-2xl">
              <a href="/exercicios" className="text-yellow-500 underline underline-offset-4">Exercícios</a>
              <a href="/alimentacao" className="transition-all hover:text-yellow-500">Alimentação</a>
              <a href="/bem-estar" className="transition-all hover:text-yellow-500">Bem-Estar</a>
              <a href="/sobre" className="transition-all hover:text-yellow-500">Sobre nós</a>
            </nav>
          </div>
        </div>
        <div className="h-2 w-full bg-yellow-500 shadow-md" />
      </header>

      <MobileFloatingIsland activeTab="home" />

      <main className="mx-auto max-w-5xl px-4 py-10">
        <h1 className="text-center text-5xl font-bold text-purple-500 mb-10 md:text-6xl">
          Exercícios
        </h1>
        <div className="h-0.5 w-full bg-purple-400 mb-8" />
        
        <div className="bg-white rounded-3xl p-8 shadow-md">
          <p className="text-center text-xl text-gray-600">
            Conteúdo de exercícios em breve!
          </p>
        </div>
      </main>
    </div>
  );
}
