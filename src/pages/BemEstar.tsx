import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { 
  Sparkles, 
  Brain, 
  Leaf, 
  Maximize2, 
  X, 
  Clock, 
  CheckCircle2, 
  LoaderCircle,
  BookOpen
} from "lucide-react";
import { db } from "../firebase";
import DesktopHeader from "../components/DesktopHeader";
import MobileFloatingIsland from "../components/MobileFloatingIsland";

export interface AtividadeBemEstar {
  id: string;
  titulo: string;
  descricao: string;
  passos: string[];
  imagem?: string;
  tema?: string;
  foco?: string;
  tempo?: string;
}

export default function BemEstar() {
  const [atividades, setAtividades] = useState<AtividadeBemEstar[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(false);

  // Controle de exibição de sub-abas internas
  const [subAba, setSubAba] = useState<"praticas" | "saude-mental">("praticas");

  // Estado para o modal Lightbox de imagens
  const [imagemModal, setImagemModal] = useState<{ src: string; titulo: string } | null>(null);

  useEffect(() => {
    const fetchAtividades = async () => {
      try {
        const atividadesCollection = collection(db, "atividades_bem_estar");
        const atividadesSnapshot = await getDocs(atividadesCollection);

        const atividadesList = atividadesSnapshot.docs
          .map((doc) => {
            const data = doc.data();
            return {
              id: doc.id,
              titulo: data.titulo || "",
              descricao: data.descricao || "",
              passos: Array.isArray(data.passos) ? data.passos : [],
              imagem: data.imagem || "",
              tema: data.tema || "Geral",
              foco: data.foco || "",
              tempo: data.tempo || "",
            };
          })
          .filter((item) => item.titulo) as AtividadeBemEstar[];

        setAtividades(atividadesList);
      } catch (error) {
        console.error("Erro ao buscar atividades de bem-estar:", error);
        setErro(true);
      } finally {
        setCarregando(false);
      }
    };

    fetchAtividades();
  }, []);

  // Resolução dinâmica de imagens locais na pasta src/assets/bem-estar/
  const resolverImagem = (nomeImagem?: string) => {
    if (!nomeImagem) return null;
    if (nomeImagem.startsWith("http")) return nomeImagem;
    try {
      return require(`../assets/bem-estar/${nomeImagem}`);
    } catch {
      return null;
    }
  };

  // Separação lógica baseada no campo 'tema'
  // Aba 1: Conteúdos gerais existentes (tema diferente de "Saúde Mental")
  const praticasEFitoterapia = atividades.filter(
    (item) => item.tema !== "Saúde Mental"
  );

  // Aba 2: Novos infográficos focados em Saúde Mental (tema === "Saúde Mental")
  const infograficosSaudeMental = atividades.filter(
    (item) => item.tema === "Saúde Mental"
  );

  return (
    <div className="w-full min-h-screen bg-gray-50 pt-24 font-sans md:pt-0">
      <DesktopHeader activeTab="bem-estar" />
      <MobileFloatingIsland activeTab="bem-estar" />

      <main className="mx-auto max-w-6xl px-4 py-8">
        {/* Título Principal */}
        <div className="mx-auto mb-8 max-w-3xl text-center">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-100 text-purple-600">
            <Sparkles size={28} />
          </div>
          <h1 className="text-3xl font-bold text-purple-900 md:text-4xl">
            Caminhos do Bem-Estar
          </h1>
          <p className="mt-2 text-base text-gray-600">
            Orientações de fitoterapia, saúde mental e guias ilustrados para apoiar o seu dia a dia com a fibromialgia.
          </p>
        </div>

        {/* Sub-abas de Navegação Interna */}
        <div className="mx-auto mb-8 flex max-w-md rounded-2xl bg-gray-200/80 p-1.5 shadow-inner">
          <button
            type="button"
            onClick={() => setSubAba("praticas")}
            className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold transition-all duration-200 ${
              subAba === "praticas"
                ? "bg-white text-purple-900 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <Leaf size={18} className={subAba === "praticas" ? "text-purple-600" : ""} />
            Práticas & Guia
            {praticasEFitoterapia.length > 0 && (
              <span className="rounded-full bg-purple-100 px-2 py-0.5 text-xs text-purple-700">
                {praticasEFitoterapia.length}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setSubAba("saude-mental")}
            className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold transition-all duration-200 ${
              subAba === "saude-mental"
                ? "bg-white text-purple-900 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <Brain size={18} className={subAba === "saude-mental" ? "text-purple-600" : ""} />
            Saúde Mental
            {infograficosSaudeMental.length > 0 && (
              <span className="rounded-full bg-purple-100 px-2 py-0.5 text-xs text-purple-700">
                {infograficosSaudeMental.length}
              </span>
            )}
          </button>
        </div>

        {/* Indicador de Carregamento */}
        {carregando && (
          <div className="flex flex-col items-center justify-center py-16 text-gray-500">
            <LoaderCircle className="animate-spin mb-2" size={32} />
            <p className="text-sm font-medium">A carregar conteúdos de bem-estar...</p>
          </div>
        )}

        {/* Mensagem de Erro */}
        {erro && !carregando && (
          <div className="rounded-2xl bg-red-50 p-6 text-center text-red-700 border border-red-200">
            Não foi possível carregar os conteúdos no momento. Tente novamente mais tarde.
          </div>
        )}

        {/* Sub-aba 1: Práticas & Guia (Conteúdo que já existia) */}
        {!carregando && !erro && subAba === "praticas" && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {praticasEFitoterapia.length > 0 ? (
              praticasEFitoterapia.map((item) => {
                const imgSrc = resolverImagem(item.imagem);
                return (
                  <div
                    key={item.id}
                    className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md"
                  >
                    <div>
                      {imgSrc && (
                        <div
                          onClick={() => setImagemModal({ src: imgSrc, titulo: item.titulo })}
                          className="relative h-48 w-full cursor-pointer bg-purple-50 overflow-hidden"
                        >
                          <img
                            src={imgSrc}
                            alt={item.titulo}
                            className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-slate-900/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <span className="flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-purple-900 shadow-md">
                              <Maximize2 size={14} className="text-purple-600" />
                              Toque para ampliar
                            </span>
                          </div>
                        </div>
                      )}

                      <div className="p-5">
                        <div className="flex items-center justify-between mb-2">
                          <span className="rounded-full bg-purple-50 px-2.5 py-1 text-xs font-semibold text-purple-700">
                            {item.tema || "Geral"}
                          </span>
                          {item.tempo && (
                            <span className="flex items-center gap-1 text-xs text-gray-400">
                              <Clock size={14} />
                              {item.tempo}
                            </span>
                          )}
                        </div>

                        <h3 className="text-lg font-bold text-gray-900 mb-2 leading-snug">
                          {item.titulo}
                        </h3>

                        <p className="text-sm text-gray-600 leading-relaxed mb-4">
                          {item.descricao}
                        </p>

                        {item.passos && item.passos.length > 0 && (
                          <div className="space-y-2 rounded-xl bg-gray-50 p-3.5 border border-gray-100">
                            {item.passos.map((passo, idx) => (
                              <div key={idx} className="flex items-start gap-2 text-xs text-gray-700">
                                <CheckCircle2 size={16} className="shrink-0 text-emerald-500 mt-0.5" />
                                <span>{passo}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {imgSrc && (
                      <div className="p-5 pt-0">
                        <button
                          type="button"
                          onClick={() => setImagemModal({ src: imgSrc, titulo: item.titulo })}
                          className="flex w-full items-center justify-center gap-2 rounded-xl bg-purple-50 py-2.5 text-xs font-bold text-purple-700 transition-colors hover:bg-purple-100"
                        >
                          <BookOpen size={16} />
                          Abrir Infográfico Completo
                        </button>
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <p className="col-span-full py-12 text-center text-gray-500 font-medium">
                Nenhuma prática cadastrada no banco de dados.
              </p>
            )}
          </div>
        )}

        {/* Sub-aba 2: Saúde Mental (Novos infográficos de Saúde Mental) */}
        {!carregando && !erro && subAba === "saude-mental" && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {infograficosSaudeMental.length > 0 ? (
              infograficosSaudeMental.map((item) => {
                const imgSrc = resolverImagem(item.imagem);
                return (
                  <div
                    key={item.id}
                    className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md"
                  >
                    <div>
                      {imgSrc ? (
                        <div
                          onClick={() => setImagemModal({ src: imgSrc, titulo: item.titulo })}
                          className="relative h-52 w-full cursor-pointer bg-purple-50 overflow-hidden"
                        >
                          <img
                            src={imgSrc}
                            alt={item.titulo}
                            className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-slate-900/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <span className="flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-purple-900 shadow-md">
                              <Maximize2 size={14} className="text-purple-600" />
                              Toque para ampliar
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="flex h-40 w-full items-center justify-center bg-purple-100 text-purple-600">
                          <BookOpen size={40} />
                        </div>
                      )}

                      <div className="p-5">
                        <span className="rounded-full bg-purple-50 px-2.5 py-1 text-xs font-semibold text-purple-700">
                          {item.tema || "Saúde Mental"}
                        </span>
                        <h3 className="mt-2 text-lg font-bold text-gray-900 leading-snug">
                          {item.titulo}
                        </h3>
                        <p className="mt-2 text-sm text-gray-600 line-clamp-3 leading-relaxed">
                          {item.descricao}
                        </p>
                      </div>
                    </div>

                    {imgSrc && (
                      <div className="p-5 pt-0">
                        <button
                          type="button"
                          onClick={() => setImagemModal({ src: imgSrc, titulo: item.titulo })}
                          className="flex w-full items-center justify-center gap-2 rounded-xl bg-purple-50 py-2.5 text-xs font-bold text-purple-700 transition-colors hover:bg-purple-100"
                        >
                          <BookOpen size={16} />
                          Abrir Infográfico Completo
                        </button>
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <p className="col-span-full py-12 text-center text-gray-500 font-medium">
                Nenhum infográfico de Saúde Mental cadastrado.
              </p>
            )}
          </div>
        )}

        {/* Modal Lightbox em Tela Cheia */}
        {imagemModal && (
          <div
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 p-2 sm:p-4 backdrop-blur-sm"
            onClick={() => setImagemModal(null)}
          >
            <div 
              className="flex w-full max-w-4xl items-center justify-between pb-3 px-2"
              onClick={(e) => e.stopPropagation()}
            >
              <h4 className="text-sm font-semibold text-white truncate max-w-[80%]">
                {imagemModal.titulo}
              </h4>
              <button
                type="button"
                onClick={() => setImagemModal(null)}
                className="rounded-full bg-white/20 p-2 text-white hover:bg-white/30 transition-colors"
                aria-label="Fechar"
              >
                <X size={22} />
              </button>
            </div>

            <div
              className="relative max-h-[85vh] max-w-full overflow-auto rounded-xl bg-slate-900"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={imagemModal.src}
                alt={imagemModal.titulo}
                className="max-h-[85vh] w-auto object-contain rounded-lg"
              />
            </div>

            <p className="mt-3 text-xs text-white/70">
              Toque fora do infográfico ou no botão fechar para sair
            </p>
          </div>
        )}
      </main>
    </div>
  );
}