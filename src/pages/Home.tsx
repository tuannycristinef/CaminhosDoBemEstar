import React from "react";
import { Link } from "react-router-dom";
import { ArrowDown, ArrowRight, HeartHandshake, Sparkles } from "lucide-react";
import yogaImg from "../assets/yoga-woman.png";
import painImg from "../assets/pain-person.png";
import { ReactComponent as WhatsappIcon } from "../assets/whatsapp.svg";
import { ReactComponent as InstagramIcon } from "../assets/instagram.svg";
import MobileFloatingIsland from "../components/MobileFloatingIsland";
import DesktopHeader from "../components/DesktopHeader";

export default function Home() {
  return (
    <div className="w-full min-h-screen bg-gray-50 pt-24 font-sans md:pt-0">
      <DesktopHeader activeTab="inicio" />
      <MobileFloatingIsland activeTab="inicio" />

      <main className="mx-auto max-w-7xl px-4 pb-12 pt-5 md:px-8 md:pt-10">
        <section className="relative overflow-hidden rounded-[2rem] bg-purple-500 px-6 py-9 text-white shadow-lg md:px-12 md:py-12 lg:px-16">
          <div aria-hidden="true" className="absolute -right-20 -top-24 h-72 w-72 rounded-full border-[35px] border-white/10 md:h-[28rem] md:w-[28rem]" />
          <div className="relative grid items-center gap-6 md:grid-cols-[1.05fr_0.95fr] md:gap-3">
            <div className="order-2 max-w-2xl md:order-1">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold text-purple-50">
                <HeartHandshake size={17} aria-hidden="true" /> UM ESPAÇO DE ACOLHIMENTO E INFORMAÇÃO
              </span>
              <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
                Caminhos para viver com mais bem-estar
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-purple-100 md:text-xl">
                Conviver com fibromialgia pode ser desafiador. Aqui você encontra informação, ideias de cuidado e apoio para seguir no seu ritmo.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href="#conteudos" className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-yellow-400 px-6 py-4 font-bold text-purple-950 transition hover:bg-yellow-300 focus:outline-none focus:ring-4 focus:ring-white/60">
                  Explorar conteúdos <ArrowDown size={19} aria-hidden="true" />
                </a>
                <Link to="/carteirinha" className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-white/50 px-6 py-4 font-semibold text-white transition hover:bg-white/10 focus:outline-none focus:ring-4 focus:ring-white/60">
                  Carteirinha da Fibromialgia <ArrowRight size={18} aria-hidden="true" />
                </Link>
              </div>
            </div>
            <div className="order-1 flex justify-center md:order-2 md:justify-end">
              <div className="relative w-full max-w-md">
                <div aria-hidden="true" className="absolute inset-x-6 bottom-3 top-8 rotate-3 rounded-[2rem] bg-yellow-300" />
                <img src={yogaImg} alt="Pessoa praticando yoga em um momento de cuidado" className="relative mx-auto max-h-[360px] w-full rounded-[2rem] object-contain md:max-h-[420px]" />
                <div className="absolute bottom-4 left-2 inline-flex max-w-[240px] items-center gap-3 rounded-2xl bg-white px-4 py-3 text-purple-900 shadow-lg sm:bottom-7 sm:left-0">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-yellow-100 text-yellow-700"><Sparkles size={20} aria-hidden="true" /></span>
                  <span className="text-sm font-semibold leading-snug">Pequenos passos também são cuidado.</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="conteudos" className="scroll-mt-6 py-14 md:py-20" aria-labelledby="conteudos-title">
          <div className="mb-8 flex flex-col gap-3 md:mb-10 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-purple-500">Encontre seu caminho</p>
              <h2 id="conteudos-title" className="mt-2 text-3xl font-bold text-gray-900 md:text-4xl">Conteúdos para o seu dia a dia</h2>
            </div>
            <p className="max-w-lg leading-relaxed text-gray-600">Explore com tranquilidade e escolha o que faz sentido para você hoje.</p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            <Link to="/exercicios" className="group rounded-[1.75rem] bg-white p-6 shadow-sm ring-1 ring-gray-100 transition hover:-translate-y-1 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-purple-400">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-100 text-2xl" aria-hidden="true">🌿</span>
              <h3 className="mt-5 text-xl font-bold text-purple-700">Movimento gentil</h3>
              <p className="mt-2 leading-relaxed text-gray-600">Alongamentos e exercícios para explorar no seu ritmo.</p>
              <span className="mt-5 inline-flex items-center gap-2 font-semibold text-purple-600">Ver exercícios <ArrowRight size={17} className="transition group-hover:translate-x-1" aria-hidden="true" /></span>
            </Link>
            <Link to="/alimentacao" className="group rounded-[1.75rem] bg-white p-6 shadow-sm ring-1 ring-gray-100 transition hover:-translate-y-1 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-purple-400">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-100 text-2xl" aria-hidden="true">🥑</span>
              <h3 className="mt-5 text-xl font-bold text-purple-700">Alimentação</h3>
              <p className="mt-2 leading-relaxed text-gray-600">Receitas simples e ideias para uma rotina mais leve.</p>
              <span className="mt-5 inline-flex items-center gap-2 font-semibold text-purple-600">Ver receitas <ArrowRight size={17} className="transition group-hover:translate-x-1" aria-hidden="true" /></span>
            </Link>
            <Link to="/bem-estar" className="group rounded-[1.75rem] bg-white p-6 shadow-sm ring-1 ring-gray-100 transition hover:-translate-y-1 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-purple-400">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-pink-100 text-2xl" aria-hidden="true">✨</span>
              <h3 className="mt-5 text-xl font-bold text-purple-700">Bem-estar</h3>
              <p className="mt-2 leading-relaxed text-gray-600">Pausas e práticas para acolher corpo e mente.</p>
              <span className="mt-5 inline-flex items-center gap-2 font-semibold text-purple-600">Encontrar práticas <ArrowRight size={17} className="transition group-hover:translate-x-1" aria-hidden="true" /></span>
            </Link>
          </div>
        </section>

        <section className="grid overflow-hidden rounded-[2rem] bg-yellow-100 md:grid-cols-[1fr_1fr]" aria-labelledby="fibromialgia-title">
          <div className="flex flex-col justify-center px-6 py-9 md:px-10 lg:px-14">
            <p className="text-sm font-bold uppercase tracking-wider text-purple-600">Informação que acolhe</p>
            <h2 id="fibromialgia-title" className="mt-3 text-3xl font-bold leading-tight text-gray-900 md:text-4xl">O que é fibromialgia?</h2>
            <p className="mt-5 text-lg leading-relaxed text-gray-700">É uma síndrome caracterizada por dor crônica generalizada, fadiga e alterações do sono e da memória. Pode afetar a qualidade de vida, e cada pessoa vive essa experiência de um jeito.</p>
            <Link to="/carteirinha" className="mt-7 inline-flex w-fit items-center gap-2 rounded-full bg-purple-600 px-6 py-3 font-bold text-white transition hover:bg-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-300">
              Conheça seus direitos <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
          <div className="flex min-h-64 items-end justify-center px-8 pt-5 md:min-h-[360px] md:px-10">
            <img src={painImg} alt="Ilustração de uma pessoa sentindo dor" className="max-h-[360px] w-full object-contain object-bottom" />
          </div>
        </section>

        <section className="mt-12 flex flex-col items-start gap-6 rounded-[2rem] bg-purple-50 p-6 sm:flex-row sm:items-center sm:justify-between md:mt-16 md:p-9">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Vamos seguir em contato?</h2>
            <p className="mt-2 text-gray-600">Acompanhe o projeto e compartilhe informação de confiança.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href="https://whatsapp.com/channel/0029Vb7adIb72WTtJYBC2h0R" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 font-semibold text-purple-700 shadow-sm transition hover:bg-purple-100">
              WhatsApp <WhatsappIcon aria-hidden="true" className="h-5 w-5" />
            </a>
            <a href="https://www.instagram.com/projetofala.dor/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 font-semibold text-purple-700 shadow-sm transition hover:bg-purple-100">
              Instagram <InstagramIcon aria-hidden="true" className="h-5 w-5" />
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
