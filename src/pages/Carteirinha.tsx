import React from "react";
import { ArrowDown, ArrowRight, Check, Clock3, FileText, MapPin, Phone, ShieldCheck } from "lucide-react";
import MobileFloatingIsland from "../components/MobileFloatingIsland";
import DesktopHeader from "../components/DesktopHeader";

const portalUrl = "https://portalcuidamais.campogrande.ms.gov.br";

const documentos = [
  "Documento pessoal com foto (RG e CPF)",
  "Cartão Nacional do SUS (CNS)",
  "Comprovante de residência de Campo Grande, MS, dos últimos 3 meses",
  "Laudo médico com diagnóstico e CID, emitido nos últimos 6 meses",
];

const duvidas = [
  {
    pergunta: "A carteirinha chega em casa?",
    resposta: "Não. Ela fica disponível em formato digital no Portal Cuida Mais, acessado com as credenciais da pessoa solicitante.",
  },
  {
    pergunta: "Qual é a validade?",
    resposta: "A validade é de dois anos. A renovação também é feita pelo próprio portal.",
  },
  {
    pergunta: "Ela vale em todo o Brasil?",
    resposta: "A carteirinha atende à Lei Municipal nº 6.491/2020 e vale no município de Campo Grande, MS.",
  },
];

export default function Carteirinha() {
  return (
    <div className="min-h-screen w-full bg-gray-50 pt-24 font-sans md:pt-0">
      <DesktopHeader activeTab="carteirinha" />
      <MobileFloatingIsland activeTab="carteirinha" />

      <main className="mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-12">
        <section className="relative overflow-hidden rounded-[2rem] bg-purple-500 px-6 py-10 text-white shadow-lg md:px-12 md:py-14">
          <div aria-hidden="true" className="absolute -right-12 -top-16 h-56 w-56 rounded-full border-[28px] border-white/10 md:h-80 md:w-80" />
          <div className="relative max-w-3xl">
            <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold tracking-wide">
              <MapPin size={16} aria-hidden="true" /> CAMPO GRANDE, MS
            </span>
            <h1 className="text-4xl font-bold leading-tight md:text-6xl">Carteirinha da Fibromialgia</h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-purple-50 md:text-xl">
              Você sabia que quem tem fibromialgia e mora em Campo Grande pode solicitar a carteirinha online?
            </p>
            <p className="mt-4 max-w-2xl leading-relaxed text-purple-100">
              O documento identifica a pessoa com fibromialgia no município e ajuda a garantir prioridade em atendimentos e filas. Também pode ser usado para acesso a vagas de estacionamento prioritárias em estabelecimentos públicos e privados de Campo Grande.
            </p>
            <a href={portalUrl} target="_blank" rel="noreferrer" className="mt-8 inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-yellow-400 px-7 py-4 font-bold text-purple-950 shadow-md transition hover:bg-yellow-300 focus:outline-none focus:ring-4 focus:ring-white/60">
              Acessar o Portal Cuida Mais <ArrowRight size={20} aria-hidden="true" />
            </a>
            <p className="mt-3 text-sm text-purple-100">A solicitação é feita no portal oficial da Prefeitura.</p>
          </div>
        </section>

        <section className="py-12 md:py-16" aria-labelledby="documentos-title">
          <div className="mb-7 flex items-center gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-yellow-100 text-yellow-700"><FileText size={24} aria-hidden="true" /></span>
            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-purple-500">Antes de começar</p>
              <h2 id="documentos-title" className="text-2xl font-bold text-gray-900 md:text-3xl">Separe estes documentos</h2>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {documentos.map((documento) => (
              <div key={documento} className="flex items-start gap-3 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-purple-100 text-purple-600"><Check size={15} aria-hidden="true" /></span>
                <p className="font-medium leading-relaxed text-gray-700">{documento}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[2rem] bg-purple-50 px-6 py-8 md:px-10 md:py-10" aria-labelledby="passos-title">
          <p className="text-sm font-bold uppercase tracking-wider text-purple-500">Solicitação online</p>
          <h2 id="passos-title" className="mt-2 text-2xl font-bold text-gray-900 md:text-3xl">Como pedir a carteirinha</h2>
          <ol className="mt-7 grid gap-4 md:grid-cols-2">
            {[
              <>Acesse o <a className="font-bold text-purple-700 underline underline-offset-2" href={portalUrl} target="_blank" rel="noreferrer">Portal Cuida Mais</a> da Prefeitura.</>,
              <>Escolha <strong>“Condição Permanente - FIBROMIALGIA”</strong> e informe seu CPF.</>,
              <>No primeiro acesso, use os quatro primeiros dígitos do CPF como senha. Redefina a senha imediatamente e entre novamente.</>,
              <>Cadastre a condição permanente, preencha as informações e anexe os documentos solicitados.</>,
              <>Clique em <strong>“Enviar”</strong> para concluir e aguarde a análise, que pode levar até 21 dias.</>,
            ].map((passo, index) => (
              <li key={index} className="flex gap-4 rounded-2xl bg-white p-5 shadow-sm">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-purple-500 font-bold text-white">{index + 1}</span>
                <p className="pt-1 leading-relaxed text-gray-700">{passo}</p>
              </li>
            ))}
          </ol>
          <div className="mt-6 flex items-start gap-3 rounded-2xl border border-yellow-300 bg-yellow-50 p-5 text-gray-800">
            <Clock3 className="mt-0.5 shrink-0 text-yellow-700" size={21} aria-hidden="true" />
            <p className="leading-relaxed"><strong>Atenção:</strong> a Prefeitura não entra em contato para informar o status do pedido. Consulte o portal com suas credenciais.</p>
          </div>
        </section>

        <section className="py-12 md:py-16" aria-labelledby="duvidas-title">
          <div className="mb-6">
            <p className="text-sm font-bold uppercase tracking-wider text-purple-500">Informações úteis</p>
            <h2 id="duvidas-title" className="mt-2 text-2xl font-bold text-gray-900 md:text-3xl">Dúvidas comuns</h2>
          </div>
          <div className="space-y-3">
            {duvidas.map((duvida) => (
              <details key={duvida.pergunta} className="group rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-gray-800 [&::-webkit-details-marker]:hidden">
                  {duvida.pergunta}<ArrowDown size={18} className="shrink-0 text-purple-500 transition group-open:rotate-180" aria-hidden="true" />
                </summary>
                <p className="mt-3 max-w-3xl leading-relaxed text-gray-600">{duvida.resposta}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="mb-10 flex flex-col gap-6 rounded-[2rem] bg-yellow-100 p-6 md:flex-row md:items-center md:justify-between md:p-9" aria-labelledby="contato-title">
          <div>
            <span className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-purple-600"><ShieldCheck size={17} aria-hidden="true" /> Precisa de ajuda?</span>
            <h2 id="contato-title" className="mt-2 text-2xl font-bold text-gray-900">Fale com a Ouvidoria da SESAU</h2>
            <p className="mt-2 text-gray-700">Tire dúvidas sobre a solicitação da carteirinha.</p>
          </div>
          <div className="flex flex-col gap-3 text-purple-800">
            <a href="tel:+556733149955" className="inline-flex items-center gap-2 font-semibold hover:underline"><Phone size={18} aria-hidden="true" />(67) 3314-9955</a>
            <a href="tel:08003149955" className="inline-flex items-center gap-2 font-semibold hover:underline"><Phone size={18} aria-hidden="true" />0800 314 9955</a>
            <a href="mailto:ouvidoria@sesau.campogrande.ms.gov.br" className="break-all font-semibold hover:underline">ouvidoria@sesau.campogrande.ms.gov.br</a>
          </div>
        </section>
        <p className="pb-4 text-center text-sm text-gray-500">Se você tem fibromialgia ou conhece alguém, compartilhe essa informação.</p>
      </main>
    </div>
  );
}
