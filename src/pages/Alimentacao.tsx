import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import saladaImg from "../assets/salada-ceasar.jpg";
import MobileFloatingIsland from "../components/MobileFloatingIsland";

export default function Alimentacao() {
  const receitas = [
    {
      id: 1,
      titulo: "Salada Ceasar",
      ingredientes: [
        "1 Pepino",
        "2 Tomates",
        "5 folhas de alface",
        "1/2 Cebola picada",
      ],
      imagem: saladaImg,
    },
  ];

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
              <a href="/exercicios" className="transition-all hover:text-yellow-500">Exercícios</a>
              <a href="/alimentacao" className="text-yellow-500 underline underline-offset-4">Alimentação</a>
              <a href="/bem-estar" className="transition-all hover:text-yellow-500">Bem-Estar</a>
              <a href="/sobre" className="transition-all hover:text-yellow-500">Sobre nós</a>
            </nav>
          </div>
        </div>
        <div className="h-2 w-full bg-yellow-500 shadow-md" />
      </header>

      <MobileFloatingIsland activeTab="alimentacao" />

      <main className="mx-auto max-w-5xl px-4 py-10">
        <h1 className="text-center text-5xl font-bold text-purple-500 mb-10 md:text-6xl">
          Alimentação
        </h1>

        <div className="h-0.5 w-full bg-purple-400 mb-8" />

        {/* Filtros */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {["Receitas", "Refeição", "Objetivo", "Tempo"].map((filter) => (
            <div key={filter} className="relative">
              <button className="flex items-center justify-between gap-4 rounded-full bg-gray-300 px-6 py-2 text-lg font-medium text-purple-600 transition-hover hover:bg-gray-400 min-w-[140px]">
                {filter}
                <span className="text-sm">▼</span>
              </button>
            </div>
          ))}
        </div>

        {/* Lista de Cards */}
        <div className="flex flex-col gap-8">
          {receitas.map((receita) => (
            <div 
              key={receita.id} 
              className="flex flex-col md:flex-row overflow-hidden rounded-3xl bg-gray-300 p-6 md:p-8 transition-transform hover:scale-[1.01]"
            >
              <div className="w-full md:w-1/3 flex items-center justify-center bg-white rounded-2xl p-2 h-64 md:h-auto">
                <img
                  src={receita.imagem}
                  alt={receita.titulo}
                  className="h-full w-full object-contain rounded-xl"
                />
              </div>

              <div className="flex flex-col justify-center mt-6 md:mt-0 md:ml-10 text-black">
                <h2 className="text-3xl font-bold mb-4">{receita.titulo}</h2>
                <ul className="space-y-1 text-xl">
                  {receita.ingredientes.map((ing, index) => (
                    <li key={index} className="flex items-center">
                      <span className="mr-2 text-sm">•</span> {ing}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}

          <div className="h-64 w-full rounded-3xl bg-gray-300" />
        </div>
      </main>
    </div>
  );
}
