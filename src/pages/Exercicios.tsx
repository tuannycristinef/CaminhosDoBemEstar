import React from "react";
import MobileFloatingIsland from "../components/MobileFloatingIsland";
import DesktopHeader from "../components/DesktopHeader";

export default function Exercicios() {
  return (
    <div className="w-full min-h-screen bg-gray-50 pt-24 font-sans md:pt-0">
      <DesktopHeader activeTab="exercicios" />

      <MobileFloatingIsland activeTab="exercicios" />

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
