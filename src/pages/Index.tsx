import React from "react";
import { useNavigate } from "react-router-dom";
import { BenefitCard } from "@/components/ui/benefitcard";
import Logo from "@/assets/logo/tareffa.svg";
import ilustracao01 from '@/assets/ilustracoes/1.svg';
import ilustracao02 from '@/assets/ilustracoes/2.svg';
import ilustracao03 from '@/assets/ilustracoes/3.svg';
import { motion } from "framer-motion";
import { FeaturesGrid } from "@/components/ui/FeaturesGrid";
import { Button } from "@/components/ui/button";
import {
  Infinity,
  Timer,
  RefreshCcw,
  Users,
  Award,
  Palette,
  PenTool,
  Eye,
  Presentation,
  Smartphone,
  PersonStanding,
} from "lucide-react";

const scrollingTexts = [
  "Design",
  "Pedidos Ilimitados",
  "Entrega em até 48hrs",
  "Múltiplos membros",
  "Templates prontos",
  "Design personalizável",
  "Peça para a IA",
  "IA Assist",
  "Design",
  "Múltiplos membros",
  "Pedidos Ilimitados",
  "Templates prontos",
  "Design personalizável",
  "Entrega em até 48hrs",
]


// Dados centralizados
const beneficios = [
  {
    title: "Solicitações Ilimitadas",
    description: "Envie quantas solicitações de design você precisar sem limites.",
    icon: <Eye className="w-6 h-6 text-yellow-400" />,
  },
  {
    title: "Entrega Mais Rápida",
    description: "Receba seus designs em tempo recorde, acelerando seus projetos.",
    icon: <Timer className="w-6 h-6 text-yellow-400" />,
  },
  {
    title: "Revisões Ilimitadas",
    description: "Peça quantas revisões forem necessárias até a perfeição.",
    icon: <RefreshCcw className="w-6 h-6 text-yellow-400" />,
  },
  {
    title: "Equipe Dedicada",
    description: "Tenha uma equipe de design focada exclusivamente em seus projetos.",
    icon: <Users className="w-6 h-6 text-yellow-400" />,
  },
  {
    title: "Designers Top 1%",
    description: "Trabalhe com os melhores talentos do mercado de design.",
    icon: <Award className="w-6 h-6 text-yellow-400" />,
  },
];

// Componente de seção de benefícios
export function BeneficiosSection() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {beneficios.map((b, i) => (
        <BenefitCard
          key={i}
          title={b.title}
          description={b.description}
          icon={b.icon}
        />
      ))}
    </div>
  );
}

// Componente principal
const Index = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Navbar */}
      <header className="w-full py-4 border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 flex justify-between items-center">
        <div
  className="cursor-pointer flex items-center gap-2"
  onClick={() => navigate("/")}
>
  <img src={Logo} alt="Logo Tareffa" className="h-8 w-auto" />
</div>

          <nav className="hidden md:flex gap-6 text-sm text-muted-foreground">
            <a href="#beneficios" className="hover:text-primary">Benefícios</a>
            <a href="#como-funciona" className="hover:text-primary">Como Funciona</a>
            <a href="#servicos" className="hover:text-primary">Serviços</a>
            <a href="#recursos" className="hover:text-primary">Recursos</a>
          </nav>
          <Button size="sm" onClick={() => navigate("/orders/new")}>
            Começar
          </Button>
        </div>
      </header>

      {/* Conteúdo principal */}
      <div className="container mx-auto px-4 py-12 space-y-16">
        {/* Hero */}
        <section
          className="space-y-6 flex flex-col items-start text-left"
          style={{ height: "100vh", paddingTop: "150px" }}
        >
          <h1
            className="animate-blurIn font-semibold max-w-[720px] text-left"
            style={{ fontSize: "57px", lineHeight: "65px" }}
          >
            Desbloqueie o Potencial de Design Ilimitado para seu Negócio
          </h1>
          <p
            className="text-xl text-muted-foreground animate-blurIn opacity-0 max-w-[720px]"
            style={{ animationDelay: "0.5s", animationFillMode: "forwards" }}
          >
            TAREFFA360: Designs Ilimitados, Gerenciamento Descomplicado. Essa é a Promessa da TAREFFA.
          </p>
          <div
            className="flex justify-start gap-4 animate-blurIn opacity-0"
            style={{ animationDelay: "2.5s", animationFillMode: "forwards" }}
          >
            <Button onClick={() => navigate("/orders/new")}>Começar Agora</Button>
            <Button variant="outline">Saiba Mais</Button>
          </div>
        </section>

        <section id="beneficios" className="w-full bg-black py-20">
  <div className="max-w-[1280px] mx-auto px-4 text-[#F1F1F1]">
    <h2 className="text-3xl font-bold text-left mb-12">
      Quem se beneficia com a Tareffa?
    </h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
      
      {/* Agências */}
      <div className="bg-zinc-900 rounded-2xl p-6 shadow-md text-left">
        <div className="mb-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#F1F1F1]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 7h18M3 12h18M3 17h18" />
          </svg>
        </div>
        <h3 className="text-sm font-semibold mb-1 text-[#F1F1F1]">Agências</h3>
        <p className="text-xs text-[#BFBFBF]">
          Agências e equipes de marketing que precisam de demandas recorrentes.
        </p>
      </div>

      {/* Times de marketing */}
      <div className="bg-zinc-900 rounded-2xl p-6 shadow-md text-left">
        <div className="mb-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#F1F1F1]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-5-3.87M9 20H4v-2a4 4 0 015-3.87M12 12a4 4 0 100-8 4 4 0 000 8zm6 8v-1a4 4 0 00-3-3.87M6 20v-1a4 4 0 013-3.87" />
          </svg>
        </div>
        <h3 className="text-sm font-semibold mb-1 text-[#F1F1F1]">Times de marketing</h3>
        <p className="text-xs text-[#BFBFBF]">
          Empresas de todos os tamanhos que querem um fluxo de trabalho organizado.
        </p>
      </div>

      {/* Startups */}
      <div className="bg-zinc-900 rounded-2xl p-6 shadow-md text-left">
        <div className="mb-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#F1F1F1]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-sm font-semibold mb-1 text-[#F1F1F1]">Startups</h3>
        <p className="text-xs text-[#BFBFBF]">
          Ideias espetaculares que necessitam de práticas rápidas e tangíveis.
        </p>
      </div>

      {/* Empreendedores */}
      <div className="bg-zinc-900 rounded-2xl p-6 shadow-md text-left">
        <div className="mb-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#F1F1F1]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m4-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z" />
          </svg>
        </div>
        <h3 className="text-sm font-semibold mb-1 text-[#F1F1F1]">Empreendedores</h3>
        <p className="text-xs text-[#BFBFBF]">
          Empreendedores e startups que buscam soluções rápidas sem complicação.
        </p>
      </div>

      {/* Pessoas físicas */}
      <div className="bg-zinc-900 rounded-2xl p-6 shadow-md text-left">
        <div className="mb-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#F1F1F1]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0v6.5M12 20h.01" />
          </svg>
        </div>
        <h3 className="text-sm font-semibold mb-1 text-[#F1F1F1]">Pessoas físicas</h3>
        <p className="text-xs text-[#BFBFBF]">
          Pessoa física que busca otimizar seu processo de trabalho.
        </p>
      </div>

    </div>
  </div>
</section>


<section id="como-funciona" className="w-full py-24 bg-white">
  <div className="max-w-7xl mx-auto px-4 flex flex-col items-center space-y-16">
    {/* Título da seção */}
    <div className="text-center max-w-2xl">
      <h2 className="text-3xl font-semibold text-gray-900">Como funciona</h2>
      <p className="text-muted-foreground mt-2 text-base">
        Trabalhar com a TAREFFA é simples, eficiente e direto ao ponto.
      </p>
    </div>

    {/* Blocos alinhados horizontalmente */}
    <div className="flex flex-wrap justify-center gap-6">
  {/* Bloco 1 */}
  <div className="w-[350px] h-[430px] border border-gray-200 rounded-2xl p-6 flex flex-col gap-4 bg-white shadow-sm">
    <motion.div
      className="w-full h-40 bg-gray-50 rounded-xl border border-dashed border-gray-200 flex items-center justify-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.img
        src={ilustracao01}
        alt="Ilustração passo 1"
        className="w-48 h-48"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
      />
    </motion.div>
    <div className="space-y-1">
      <h3 className="text-lg font-medium text-gray-900">01. Envie sua Solicitação</h3>
      <p className="text-sm text-muted-foreground">
        Use o formulário inteligente da TAREFFA360 para enviar suas demandas de design. Seu gerente de projeto vai revisar e iniciar o processo.
      </p>
    </div>
  </div>

  {/* Bloco 2 */}
  <div className="w-[350px] h-[430px] border border-gray-200 rounded-2xl p-6 flex flex-col gap-4 bg-white shadow-sm">
    <motion.div
      className="w-full h-40 bg-gray-50 rounded-xl border border-dashed border-gray-200 flex items-center justify-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
    >
      <motion.img
        src={ilustracao02} // importe esse SVG no topo
        alt="Ilustração passo 2"
        className="w-48 h-48"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
      />
    </motion.div>
    <div className="space-y-1">
      <h3 className="text-lg font-medium text-gray-900">02. Colabore com o Time</h3>
      <p className="text-sm text-muted-foreground">
        Seu gerente e o time de designers trabalham nas suas solicitações, mantêm você informado e entregam os arquivos para revisão.
      </p>
    </div>
  </div>

  {/* Bloco 3 */}
  <div className="w-[350px] h-[430px] border border-gray-200 rounded-2xl p-6 flex flex-col gap-4 bg-white shadow-sm">
    <motion.div
      className="w-full h-40 bg-gray-50 rounded-xl border border-dashed border-gray-200 flex items-center justify-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
    >
      <motion.img
        src={ilustracao03} // importe esse SVG no topo
        alt="Ilustração passo 3"
        className="w-48 h-48"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
      />
    </motion.div>
    <div className="space-y-1">
      <h3 className="text-lg font-medium text-gray-900">03. Revise, Aprove e Repita</h3>
      <p className="text-sm text-muted-foreground">
        Acompanhe os designs entregues, envie feedback com comentários e continue criando novas solicitações sem limites.
      </p>
    </div>
  </div>
</div>

  </div>
</section>

{/* Marquee de textos passando automaticamente */}
<div className="relative w-full overflow-hidden my-12">
<div className="flex whitespace-nowrap animate-marquee hover:animate-marquee-slow">

    {[...scrollingTexts, ...scrollingTexts].map((text, index) => (
      <button
        key={index}
        className="border-[0.5px] h-[40px] px-4 mx-2 text-sm rounded-full text-muted-foreground hover:bg-muted/20 transition-colors"
      >
        {text}
      </button>
    ))}
  </div>
</div>






        {/* Como Funciona - ainda não finalizado no trecho enviado */}
        {/* <section id="como-funciona" className="mb-[100px]">...</section> */}
      </div>
    </>
  );
};

export default Index;

import { cn } from "@/lib/utils";

const features = [
  "Design",
  "Pedidos Ilimitados",
  "Entrega em até 48hrs",
  "Múltiplos membros",
  "Templates prontos",
  "Design personalizável",
  "Peça para a IA",
  "IA Assist",
  "Design",
  "Múltiplos membros",
  "Pedidos Ilimitados",
  "Templates prontos",
  "Design personalizável",
  "Entrega em até 48hrs",
];

export function InfiniteScrollText() {
  return (
    <div className="overflow-hidden py-6 bg-muted border-y">
      <div className="animate-marquee whitespace-nowrap flex gap-4">
        {features.map((text, idx) => (
          <button
            key={idx}
            className={cn(
              "h-10 px-4 rounded-full border border-border text-sm text-muted-foreground bg-background hover:bg-accent transition"
            )}
          >
            {text}
          </button>
        ))}
      </div>
    </div>
  );
}

<section className="overflow-hidden whitespace-nowrap border-y border-gray-200 bg-muted">
  <div className="animate-marquee flex gap-6 py-2">
    {[
      "Design",
      "Pedidos Ilimitados",
      "Entrega em até 48hrs",
      "Múltiplos membros",
      "Templates prontos",
      "Design personalizável",
      "Peça para a IA",
      "IA Assist",
      "Design",
      "Múltiplos membros",
      "Pedidos Ilimitados",
      "Templates prontos",
      "Design personalizável",
      "Entrega em até 48hrs",
    ].map((text, idx) => (
      <span
        key={idx}
        className="flex items-center justify-center border rounded-full h-10 px-4 text-sm bg-white text-gray-800"
      >
        {text}
      </span>
    ))}
  </div>
</section>

