import React from "react";
import MobileFloatingIsland from "../components/MobileFloatingIsland";
import DesktopHeader from "../components/DesktopHeader";

export default function BemEstar() {
  return (
    <div className="w-full min-h-screen bg-gray-50 pt-24 font-sans md:pt-0">
      <DesktopHeader activeTab="bem-estar" />

      <MobileFloatingIsland activeTab="bem-estar" />

      <main className="mx-auto max-w-5xl px-4 py-10">
        <h1 className="text-center text-5xl font-bold text-purple-500 mb-10 md:text-6xl">
          Bem-Estar
        </h1>
        
        <div className="h-0.5 w-full bg-purple-400 mb-8" />

        <div className="flex flex-wrap justify-center gap-4 mb-8 max-w-4xl mx-auto">
          <div className="relative">
            <select className="appearance-none bg-[#e2e2e2] text-[#8A4FFF] font-semibold py-2 pl-6 pr-10 rounded-full outline-none cursor-pointer">
              <option>Tema</option>
            </select>
            <svg className="w-4 h-4 text-[#8A4FFF] absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          
          <div className="relative">
            <select className="appearance-none bg-[#e2e2e2] text-[#8A4FFF] font-semibold py-2 pl-6 pr-10 rounded-full outline-none cursor-pointer">
              <option>Tempo</option>
            </select>
            <svg className="w-4 h-4 text-[#8A4FFF] absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          
          <div className="relative">
            <select className="appearance-none bg-[#e2e2e2] text-[#8A4FFF] font-semibold py-2 pl-6 pr-10 rounded-full outline-none cursor-pointer">
              <option>Foco</option>
            </select>
            <svg className="w-4 h-4 text-[#8A4FFF] absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        <div className="bg-[#d1d5db] rounded-3xl p-6 flex flex-col md:flex-row items-center gap-8 mb-6 max-w-4xl mx-auto transition-transform duration-300 hover:scale-[1.03] hover:shadow-md cursor-pointer">
          <div className="w-40 h-28 rounded-2xl bg-white flex items-center justify-center shrink-0 overflow-hidden shadow-sm">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12 text-black">
              <path d="M11 5L6 9H2v6h4l5 4V5z"></path>
              <line x1="23" y1="9" x2="17" y2="15"></line>
              <line x1="17" y1="9" x2="23" y2="15"></line>
            </svg>
          </div>
          
          <div className="flex-1 text-black">
            <h2 className="text-2xl font-bold mb-2">Redução de Estímulos</h2>
            <p className="mb-3 font-medium text-base">Reserve 15 minutos do dia para reduzir estímulos:</p>
            <ul className="list-disc list-inside text-sm font-medium space-y-1">
              <li>Diminua as luzes</li>
              <li>Afaste-se do celular</li>
              <li>Pratique respiração lenta e profunda</li>
            </ul>
          </div>
        </div>

        <div className="bg-[#d1d5db] rounded-3xl h-48 w-full max-w-4xl mx-auto"></div>
      </main>
    </div>
  );
}