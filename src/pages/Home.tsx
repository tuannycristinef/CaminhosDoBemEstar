import React from "react";
import logo from "../assets/logo.png"; // O logo da flor de lótus
import yogaImg from "../assets/yoga-woman.png"; // A imagem da mulher fazendo yoga
import painImg from "../assets/pain-person.png"; // A imagem da pessoa sentindo dor
import { ReactComponent as WhatsappIcon } from "../assets/whatsapp.svg";
import { ReactComponent as InstagramIcon } from "../assets/instagram.svg";
import MobileFloatingIsland from "../components/MobileFloatingIsland";

export default function Home() {
  return (
    <div className="w-full min-h-screen bg-gray-50 pt-24 font-sans md:pt-0">
      {/* Header */}
      <header className="relative hidden md:block">
        <div className="relative bg-gray-50 py-4 lg:py-6">
          <div className="absolute left-6 top-1/2 flex -translate-y-1/2 items-center md:left-8 lg:left-10">
            <img src={logo} alt="Logo" className="h-12 w-12" />
          </div>
          <div className="mx-auto flex w-full max-w-7xl items-center justify-center px-2 md:px-4 lg:px-6">
            <nav className="flex flex-wrap justify-center gap-3 text-lg font-semibold text-purple-500 md:gap-6 md:text-xl lg:gap-12 lg:text-2xl">
              <a href="/" className="transition-all hover:text-yellow-500">Exercícios</a>
              <a href="/alimentacao" className="transition-all hover:text-yellow-500">Alimentação</a>
              <a href="/bem-estar" className="transition-all hover:text-yellow-500">Bem-Estar</a>
              <a href="/sobre" className="transition-all hover:text-yellow-500">Sobre nós</a>
            </nav>
          </div>
        </div>
        <div className="h-2 w-full bg-yellow-500 shadow-md" />
      </header>

      <MobileFloatingIsland activeTab="home" />

      <main className="mx-auto max-w-6xl px-6 py-12">
        {/* Seção Superior: Boas-vindas */}
        <section className="flex flex-col md:flex-row items-center justify-between gap-10 mb-20">
          <div className="w-full md:w-1/2">
            <img 
              src={yogaImg} 
              alt="Ilustração Yoga" 
              className="w-full h-auto object-contain"
            />
          </div>
          
          <div className="w-full md:w-1/2 text-right flex flex-col items-end">
            <p className="text-purple-500 text-2xl md:text-3xl font-medium leading-relaxed max-w-md">
              Bem-vindo(a) ao seu espaço de cuidado e renovação! Viver com fibromialgia é um desafio, mas é possível encontrar alívio e alegria. Sua jornada para uma vida mais leve começa agora 😄.
            </p>
            
            {/* Redes Sociais */}
            <div className="mt-8 space-y-4">
              <a href="https://wa.me/" className="group flex items-center justify-end gap-3 text-2xl font-semibold text-purple-600 transition-colors hover:text-yellow-500" target="_blank" rel="noreferrer">
                Whatsapp <WhatsappIcon aria-hidden="true" className="h-8 w-8" />
              </a>
              <a href="https://www.instagram.com/projetofala.dor/" className="group flex items-center justify-end gap-3 text-2xl font-semibold text-purple-600 transition-colors hover:text-yellow-500" target="_blank" rel="noreferrer">
                @projetofala.dor <InstagramIcon aria-hidden="true" className="h-8 w-8" />
              </a>
            </div>
          </div>
        </section>

        {/* Seção Inferior: O que é Fibromialgia */}
        <section className="flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-3/5">
            <h2 className="text-yellow-500 text-4xl md:text-5xl font-bold mb-6">
              O que é a fibromialgia?
            </h2>
            <div className="space-y-4 text-yellow-500 text-2xl md:text-3xl font-medium leading-snug">
              <p>
                É uma síndrome caracterizada por dor crônica generalizada, fadiga, alterações do sono e da memória.
              </p>
              <p>
                Atinge principalmente mulheres e impacta muito a qualidade de vida.
              </p>
            </div>
          </div>

          <div className="w-full md:w-2/5 flex justify-center">
            <img 
              src={painImg} 
              alt="Ilustração Dor" 
              className="w-full max-w-xs h-auto object-contain"
            />
          </div>
        </section>
      </main>
    </div>
  );
}