import React, { useEffect, useMemo, useRef, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { ArrowLeft, ArrowRight, Check, Download, Heart, LoaderCircle, Sparkles } from "lucide-react";
import { db } from "../firebase";
import DesktopHeader from "../components/DesktopHeader";
import MobileFloatingIsland from "../components/MobileFloatingIsland";
import imagemExercicio from "../assets/yoga-woman.png";

type Receita = { id: string; titulo: string; refeicao: string; tempo: string; objetivo: string; imagem: string };
type Atividade = { id: string; titulo: string; descricao: string; passos: string[]; imagem: string };
type Exercicio = { id: string; titulo: string; dificuldade: string };

const EXERCICIOS: Exercicio[] = [
  { id: "90-90", titulo: "Alongamento 90/90 de quadril", dificuldade: "Médio" },
  { id: "antebraco", titulo: "Alongamento de antebraço e pulso", dificuldade: "Fácil" },
  { id: "cervical", titulo: "Alongamento para alívio cervical", dificuldade: "Fácil" },
  { id: "punho", titulo: "Mobilidade de punho", dificuldade: "Fácil" },
  { id: "triceps", titulo: "Alongamento de tríceps", dificuldade: "Fácil" },
  { id: "lateral", titulo: "Alongamento lateral da coluna", dificuldade: "Médio" },
  { id: "axial", titulo: "Alongamento axial", dificuldade: "Médio" },
  { id: "coxa", titulo: "Alongamento de coxa", dificuldade: "Médio" },
  { id: "isquiotibiais", titulo: "Alongamento de isquiotibiais", dificuldade: "Médio" },
  { id: "quadril", titulo: "Alongamento de glúteos e quadril", dificuldade: "Médio" },
  { id: "lombar", titulo: "Alongamento para a lombar", dificuldade: "Fácil" },
];

function imagemReceita(nome: string) {
  if (!nome) return "";
  try { return require(`../assets/receitas/${nome}`); } catch { return ""; }
}

function AlternarItem({ id, label, checked, onChange, detalhe, imagem, expandido }: { id: string; label: string; checked: boolean; onChange: () => void; detalhe?: string; imagem?: string; expandido?: string[] }) {
  return <label htmlFor={id} className={`group flex min-h-[104px] cursor-pointer items-center gap-4 rounded-2xl border-2 p-3 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md focus-within:ring-4 focus-within:ring-purple-200 ${checked ? "border-purple-500 bg-purple-50 shadow-sm" : "border-gray-200 bg-white hover:border-purple-300"}`}>
    {imagem ? <img src={imagem} alt="" className="h-20 w-20 shrink-0 rounded-xl bg-purple-50 object-cover" /> : <span aria-hidden="true" className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-purple-100 text-3xl">💜</span>}
    <input id={id} type="checkbox" checked={checked} onChange={onChange} className="h-6 w-6 shrink-0 accent-purple-700" />
    <span className="min-w-0 flex-1"><span className="block text-base font-bold leading-snug text-gray-900">{label}</span>{detalhe && <span className="mt-1 block text-sm leading-snug text-gray-700" style={{ display: "-webkit-box", WebkitBoxOrient: "vertical", WebkitLineClamp: 2, overflow: "hidden" }}>{detalhe}</span>}{checked && <span className="mt-1 inline-flex items-center gap-1 text-sm font-bold text-purple-700"><Check size={16} /> Adicionado à rotina</span>}{expandido && expandido.length > 0 && checked && <span className="mt-2 block border-t border-purple-200 pt-2 text-sm leading-relaxed text-gray-700">{expandido.slice(0, 3).map((linha, index) => <span key={index} className="block">• {linha}</span>)}{expandido.length > 3 && <span className="mt-1 block font-semibold text-purple-700">+ {expandido.length - 3} passos na rotina baixada</span>}</span>}</span>
  </label>;
}

export default function CalculadoraBemEstar() {
  const [receitas, setReceitas] = useState<Receita[]>([]);
  const [atividades, setAtividades] = useState<Atividade[]>([]);
  const [receitasCarregadas, setReceitasCarregadas] = useState(false);
  const [atividadesCarregadas, setAtividadesCarregadas] = useState(false);
  const [receitasErro, setReceitasErro] = useState(false);
  const [atividadesErro, setAtividadesErro] = useState(false);
  const [refeicoes, setRefeicoes] = useState<Record<string, string[]>>({});
  const [exercicios, setExercicios] = useState<string[]>([]);
  const [bemEstar, setBemEstar] = useState<string[]>([]);
  const [nome, setNome] = useState("");
  const [meta, setMeta] = useState("Criar uma rotina equilibrada");
  const [baixando, setBaixando] = useState(false);
  const [etapa, setEtapa] = useState(0);
  const painelEtapa = useRef<HTMLElement>(null);
  const etapas = [
    { titulo: "Alimentação", detalhe: "Escolha receitas", icone: "🥗" },
    { titulo: "Exercícios", detalhe: "Escolha movimentos", icone: "🧘" },
    { titulo: "Bem-estar", detalhe: "Escolha atividades", icone: "💜" },
  ];

  useEffect(() => {
    getDocs(collection(db, "receitas")).then((snapshot) => setReceitas(snapshot.docs.map((doc) => {
      const data = doc.data();
      return { id: doc.id, titulo: data.titulo ?? "", refeicao: data.refeicao ?? "", tempo: data.tempo ?? "", objetivo: data.objetivo ?? "", imagem: data.imagem ?? "" };
    }).filter((item) => item.titulo))).catch(() => setReceitasErro(true)).finally(() => setReceitasCarregadas(true));
    getDocs(collection(db, "atividades_bem_estar")).then((snapshot) => setAtividades(snapshot.docs.map((doc) => {
      const data = doc.data();
      return { id: doc.id, titulo: data.titulo ?? "", descricao: data.descricao ?? "", passos: Array.isArray(data.passos) ? data.passos : [], imagem: data.imagem ?? "" };
    }).filter((item) => item.titulo))).catch(() => setAtividadesErro(true)).finally(() => setAtividadesCarregadas(true));
  }, []);

  useEffect(() => {
    painelEtapa.current?.focus({ preventScroll: true });
  }, [etapa]);

  const refeicoesAgrupadas = useMemo(() => receitas.reduce<Record<string, Receita[]>>((grupos, receita) => {
    const grupo = receita.refeicao || "Outras receitas";
    (grupos[grupo] ||= []).push(receita);
    return grupos;
  }, {}), [receitas]);
  const totalItens = Object.values(refeicoes).flat().length + exercicios.length + bemEstar.length;
  const totalGrupos = [Object.values(refeicoes).some((lista) => lista.length), exercicios.length > 0, bemEstar.length > 0].filter(Boolean).length;
  const mensagens = totalItens === 0 ? ["Selecione algumas opções para montar sua rotina."] : [
    `${totalItens} ${totalItens === 1 ? "item escolhido" : "itens escolhidos"} em ${totalGrupos} ${totalGrupos === 1 ? "área" : "áreas"} do bem-estar.`,
    totalGrupos === 3 ? "Sua rotina combina alimentação, movimento e autocuidado." : "Você pode combinar alimentação, movimento e autocuidado para uma rotina mais variada.",
    exercicios.length > 0 ? "Faça os movimentos com conforto e respeite seus limites." : "Inclua movimento no seu ritmo, se fizer sentido para você.",
  ];

  function alternar<T extends string>(itens: T[], valor: T, setItens: (next: T[]) => void) {
    setItens(itens.includes(valor) ? itens.filter((item) => item !== valor) : [...itens, valor]);
  }

  async function baixarRotina(lado: "frente" | "verso") {
    if (totalItens === 0) return;
    setBaixando(true);
    try {
      const canvas = document.createElement("canvas");
      canvas.width = 1588;
      canvas.height = 2244;
      const context = canvas.getContext("2d");
      if (!context) throw new Error("Canvas indisponível");
      const margin = 116;
      const width = canvas.width;
      context.fillStyle = "#ffffff";
      context.fillRect(0, 0, width, canvas.height);
      context.fillStyle = "#7c3aed";
      context.font = "bold 26px Arial";
      context.fillText("CAMINHOS DO BEM-ESTAR", margin, 130);
      context.font = "bold 66px Arial";
      context.fillText(lado === "frente" ? "Minha rotina" : "Meu acompanhamento", margin, 220);
      context.fillStyle = "#4b5563";
      context.font = "32px Arial";
      context.fillText(`${nome.trim() || "Um passo de cada vez"} · ${meta}`, margin, 280);
      context.textAlign = "right";
      context.font = "26px Arial";
      context.fillText(new Date().toLocaleDateString("pt-BR"), width - margin, 130);
      context.textAlign = "left";
      context.fillStyle = "#facc15";
      context.fillRect(margin, 320, width - margin * 2, 8);

      if (lado === "frente") {
        let y = 390;
        const drawSection = (title: string, entries: Array<{ titulo: string; detalhe?: string; linhas?: string[] }>) => {
          if (!entries.length || y > 1700) return;
          context.fillStyle = "#6d28d9"; context.font = "bold 36px Arial"; context.fillText(title, margin, y); y += 24;
          context.strokeStyle = "#ddd6fe"; context.lineWidth = 2; context.beginPath(); context.moveTo(margin, y); context.lineTo(width - margin, y); context.stroke(); y += 38;
          entries.forEach((entry) => {
            if (y > 1690) return;
            context.strokeStyle = "#8b5cf6"; context.lineWidth = 3; context.strokeRect(margin, y - 24, 30, 30);
            context.fillStyle = "#1f2937"; context.font = "bold 27px Arial";
            const words = entry.titulo.split(" "); let line = ""; let lineY = y;
            words.forEach((word) => { const candidate = line ? `${line} ${word}` : word; if (context.measureText(candidate).width > width - margin * 2 - 65 && line) { context.fillText(line, margin + 52, lineY); line = word; lineY += 34; } else line = candidate; });
            context.fillText(line, margin + 52, lineY); y = lineY + 34;
            if (entry.detalhe && y < 1700) { context.fillStyle = "#6b7280"; context.font = "21px Arial"; context.fillText(entry.detalhe.slice(0, 100), margin + 52, y); y += 27; }
            (entry.linhas || []).slice(0, 3).forEach((passo) => { if (y < 1700) { context.fillStyle = "#6b7280"; context.font = "20px Arial"; context.fillText(`• ${passo}`.slice(0, 90), margin + 52, y); y += 25; } });
            y += 13;
          });
          y += 13;
        };
        const receitasSelecionadas = Object.entries(refeicoes).flatMap(([grupo, ids]) => ids.map((id) => { const r = receitas.find((item) => item.id === id); return { titulo: r?.titulo ?? id, detalhe: [grupo, r?.tempo, r?.objetivo].filter(Boolean).join(" · ") }; }));
        drawSection("Alimentação", receitasSelecionadas);
        drawSection("Movimento", exercicios.map((id) => { const e = EXERCICIOS.find((item) => item.id === id); return { titulo: e?.titulo ?? id, detalhe: e ? `Dificuldade: ${e.dificuldade} · Faça no seu ritmo` : "" }; }));
        drawSection("Bem-estar", bemEstar.map((id) => { const a = atividades.find((item) => item.id === id); return { titulo: a?.titulo ?? id, detalhe: a?.descricao, linhas: a?.passos }; }));
        context.fillStyle = "#9ca3af"; context.font = "22px Arial"; context.fillText("Use esta lista como inspiração e respeite o seu ritmo.", margin, canvas.height - 75);
      } else {
        context.fillStyle = "#6b7280"; context.font = "26px Arial"; context.fillText("Marque os quadrinhos quando concluir sua rotina em cada dia.", margin, 390);
        const dias = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"];
        const categorias = ["Alimentação", "Exercícios", "Bem-estar", "Meu momento de pausa"];
        const left = margin; const top = 485; const labelWidth = 330; const cellWidth = (width - margin * 2 - labelWidth) / 7;
        context.fillStyle = "#6d28d9"; context.font = "bold 23px Arial"; context.fillText("HÁBITO", left, top);
        dias.forEach((dia, index) => { const x = left + labelWidth + index * cellWidth; context.textAlign = "center"; context.fillText(dia.slice(0, 3), x + cellWidth / 2, top); });
        context.textAlign = "left";
        categorias.forEach((categoria, row) => {
          const y = top + 45 + row * 150;
          context.fillStyle = row % 2 ? "#faf5ff" : "#f5f3ff"; context.fillRect(left, y, width - margin * 2, 130);
          context.fillStyle = "#374151"; context.font = "bold 25px Arial"; context.fillText(categoria, left + 16, y + 70);
          dias.forEach((_, index) => { const x = left + labelWidth + index * cellWidth + (cellWidth - 45) / 2; context.strokeStyle = "#8b5cf6"; context.lineWidth = 3; context.strokeRect(x, y + 42, 45, 45); });
        });
        const notesY = top + 45 + categorias.length * 150 + 55;
        context.fillStyle = "#6d28d9"; context.font = "bold 28px Arial"; context.fillText("Pequenas vitórias da semana", margin, notesY);
        context.strokeStyle = "#ddd6fe"; context.lineWidth = 2;
        for (let i = 1; i <= 4; i++) { context.beginPath(); context.moveTo(margin, notesY + 45 * i); context.lineTo(width - margin, notesY + 45 * i); context.stroke(); }
        context.fillStyle = "#9ca3af"; context.font = "22px Arial"; context.fillText("Não precisa ser perfeito. Cada passo conta.", margin, canvas.height - 75);
      }
      const link = document.createElement("a");
      link.download = `minha-rotina-${lado}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch {
      window.alert("Não foi possível gerar a imagem neste navegador. Tente novamente.");
    } finally {
      setBaixando(false);
    }
  }

  return <div className="min-h-screen w-full bg-gray-50 pt-24 font-sans md:pt-0">
    <DesktopHeader activeTab="calculadora" />
    <MobileFloatingIsland activeTab="calculadora" />
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="mx-auto mb-10 max-w-3xl text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-100 text-purple-600"><Heart size={28} /></div>
        <h1 className="text-4xl font-bold text-purple-600 md:text-5xl">Minha rotina de bem-estar</h1>
        <p className="mt-4 text-gray-600">Escolha receitas, exercícios e atividades das outras abas. Ao final, salve sua rotina em uma folha A4 para acompanhar no seu dia a dia.</p>
      </div>

      <section className="mb-6 rounded-[2rem] bg-white p-5 shadow-sm md:p-7" aria-label="Progresso da montagem da rotina">
        <div className="mb-5 flex items-center justify-between gap-3">
          {etapas.map((item, index) => <React.Fragment key={item.titulo}>
            <button type="button" onClick={() => setEtapa(index)} aria-current={etapa === index ? "step" : undefined} className="flex min-w-0 items-center gap-2 text-left">
              <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-lg font-bold transition-all duration-300 ${etapa === index ? "bg-purple-700 text-white shadow-md ring-4 ring-purple-100" : etapa > index ? "bg-yellow-300 text-purple-950" : "bg-purple-100 text-purple-700"}`}>{etapa > index ? <Check size={21} /> : index + 1}</span>
              <span className="hidden sm:block"><strong className={`block text-base ${etapa === index ? "text-purple-800" : "text-gray-700"}`}>{item.titulo}</strong><small className="text-sm text-gray-600">{item.detalhe}</small></span>
            </button>
            {index < etapas.length - 1 && <div className={`h-1 flex-1 rounded-full ${etapa > index ? "bg-yellow-300" : "bg-purple-100"}`} />}
          </React.Fragment>)}
        </div>
        <div className="h-3 overflow-hidden rounded-full bg-purple-100"><div className="h-full rounded-full bg-yellow-400 transition-all duration-500 ease-out" style={{ width: `${((etapa + 1) / etapas.length) * 100}%` }} /></div>
        <p className="mt-3 text-center text-base font-bold text-purple-800 sm:hidden">Etapa {etapa + 1} de 3 · {etapas[etapa].titulo}</p>
      </section>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <section className="rounded-3xl bg-white p-5 shadow-sm md:p-7">
          <div className="mb-5 flex items-center gap-3"><span aria-hidden="true" className="flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-100 text-3xl">{etapas[etapa].icone}</span><div><p className="text-sm font-bold uppercase tracking-wider text-purple-700">Etapa {etapa + 1} de 3</p><h2 className="text-2xl font-bold text-gray-950" id="etapa-titulo">{etapas[etapa].titulo}</h2></div></div>
          <div ref={painelEtapa} tabIndex={-1} key={etapa} className="routine-step-enter outline-none" aria-live="polite">
          {etapa === 0 && <><p className="mb-5 text-base leading-relaxed text-gray-700">Marque as receitas que gostaria de incluir. Toque novamente para desmarcar.</p>{!receitasCarregadas ? <p className="flex items-center gap-2 text-base text-gray-600"><LoaderCircle className="animate-spin" size={20} /> Carregando receitas…</p> : Object.keys(refeicoesAgrupadas).length ? <div className="space-y-5">{Object.entries(refeicoesAgrupadas).map(([grupo, lista]) => <fieldset key={grupo}><legend className="mb-3 text-lg font-bold text-purple-700">{grupo}</legend><div className="grid gap-3 sm:grid-cols-2">{lista.map((receita) => <AlternarItem key={receita.id} id={`receita-${receita.id}`} label={receita.titulo} checked={(refeicoes[grupo] || []).includes(receita.id)} onChange={() => setRefeicoes((prev) => ({ ...prev, [grupo]: (prev[grupo] || []).includes(receita.id) ? prev[grupo].filter((id) => id !== receita.id) : [...(prev[grupo] || []), receita.id] }))} detalhe={[receita.tempo && `Preparo: ${receita.tempo}`, receita.objetivo && `Objetivo: ${receita.objetivo}`].filter(Boolean).join(" · ")} imagem={imagemReceita(receita.imagem)} />)}</div></fieldset>)}</div> : <p className="text-base text-gray-600">{receitasErro ? "Não foi possível carregar as receitas agora. Tente novamente mais tarde." : "Ainda não há receitas disponíveis."}</p>}</>}
          {etapa === 1 && <><p className="mb-5 text-base leading-relaxed text-gray-700">Escolha os movimentos que quer praticar. Cada movimento tem um vídeo na aba Exercícios.</p><div className="grid gap-3 sm:grid-cols-2">{EXERCICIOS.map((item) => <AlternarItem key={item.id} id={`exercicio-${item.id}`} label={item.titulo} detalhe={`Dificuldade: ${item.dificuldade}`} checked={exercicios.includes(item.id)} onChange={() => alternar(exercicios, item.id, setExercicios)} imagem={imagemExercicio} />)}</div></>}
          {etapa === 2 && <><p className="mb-5 text-base leading-relaxed text-gray-700">Inclua atividades de autocuidado. Ao selecionar, os passos também ficam visíveis.</p>{!atividadesCarregadas ? <p className="flex items-center gap-2 text-base text-gray-600"><LoaderCircle className="animate-spin" size={20} /> Carregando atividades…</p> : atividades.length ? <div className="grid gap-3 sm:grid-cols-2">{atividades.map((item) => <AlternarItem key={item.id} id={`bem-estar-${item.id}`} label={item.titulo} detalhe={item.descricao} checked={bemEstar.includes(item.id)} onChange={() => alternar(bemEstar, item.id, setBemEstar)} imagem={item.imagem} expandido={item.passos} />)}</div> : <p className="text-base text-gray-600">{atividadesErro ? "Não foi possível carregar as atividades agora. Tente novamente mais tarde." : "Ainda não há atividades disponíveis."}</p>}</>}
          </div>
          <div className="mt-7 flex justify-between border-t border-gray-100 pt-5"><button type="button" disabled={etapa === 0} onClick={() => setEtapa((atual) => Math.max(0, atual - 1))} className="inline-flex min-h-14 items-center gap-2 rounded-full px-5 text-base font-bold text-purple-800 transition hover:bg-purple-50 disabled:invisible"><ArrowLeft size={20} /> Voltar</button>{etapa < 2 ? <button type="button" onClick={() => setEtapa((atual) => Math.min(2, atual + 1))} className="inline-flex min-h-14 items-center gap-2 rounded-full bg-purple-700 px-6 text-base font-bold text-white shadow-md transition hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-200">Próxima etapa <ArrowRight size={20} /></button> : <span className="self-center text-base font-bold text-purple-800">Seleção concluída ✓</span>}</div>
        </section>

        <aside className="space-y-5 lg:sticky lg:top-6 lg:self-start">
          <section className="rounded-3xl bg-purple-600 p-6 text-white shadow-lg">
            <span className="mb-2 inline-flex items-center gap-2 text-base font-semibold text-purple-50"><Sparkles size={20} /> Resumo da sua seleção</span>
            <p className="mb-4 text-3xl font-bold">{totalItens} {totalItens === 1 ? "item" : "itens"}</p>
            <ul className="space-y-2 text-base leading-relaxed text-white">{mensagens.map((mensagem) => <li key={mensagem}>• {mensagem}</li>)}</ul>
            <div className="mt-5 grid grid-cols-3 gap-2 text-center text-sm"><div className="rounded-xl bg-white/15 p-3"><strong className="block text-2xl">{Object.values(refeicoes).flat().length}</strong>receitas</div><div className="rounded-xl bg-white/15 p-3"><strong className="block text-2xl">{exercicios.length}</strong>exercícios</div><div className="rounded-xl bg-white/15 p-3"><strong className="block text-2xl">{bemEstar.length}</strong>atividades</div></div>
          </section>
          <section className="rounded-3xl bg-white p-5 shadow-sm">
            <label htmlFor="rotina-nome" className="mb-2 block text-base font-semibold text-gray-800">Seu nome (opcional)</label><input id="rotina-nome" value={nome} onChange={(e) => setNome(e.target.value)} maxLength={50} placeholder="Como podemos te chamar?" className="mb-4 min-h-14 w-full rounded-xl border-2 border-gray-300 px-4 py-3 text-base text-gray-900 outline-none focus:border-purple-600 focus:ring-4 focus:ring-purple-100" />
            <label htmlFor="rotina-meta" className="mb-2 block text-base font-semibold text-gray-800">Minha intenção</label><select id="rotina-meta" value={meta} onChange={(e) => setMeta(e.target.value)} className="mb-4 min-h-14 w-full rounded-xl border-2 border-gray-300 bg-white px-4 py-3 text-base text-gray-900 outline-none focus:border-purple-600"><option>Criar uma rotina equilibrada</option><option>Ter mais disposição</option><option>Reservar tempo para mim</option><option>Experimentar hábitos saudáveis</option></select>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2"><button type="button" disabled={baixando || totalItens === 0} onClick={() => baixarRotina("frente")} className="flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-yellow-400 px-4 py-3 text-base font-bold text-purple-950 shadow-sm transition hover:bg-yellow-300 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-yellow-200 disabled:cursor-not-allowed disabled:opacity-50"><Download size={20} />Baixar frente A4</button><button type="button" disabled={baixando || totalItens === 0} onClick={() => baixarRotina("verso")} className="flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-purple-100 px-4 py-3 text-base font-bold text-purple-900 transition hover:bg-purple-200 focus:outline-none focus:ring-4 focus:ring-purple-200 disabled:cursor-not-allowed disabled:opacity-50"><Download size={20} />Baixar verso A4</button></div>
            <p className="mt-3 text-center text-sm leading-relaxed text-gray-700">Imprima as duas imagens frente e verso (virar pela borda longa).</p>
          </section>
        </aside>
      </div>

    </main>
  </div>;
}
