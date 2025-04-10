
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Palette, 
  PenTool, 
  Eye, 
  Presentation, 
  Smartphone, 
  Workflow, 
  FolderArchive,
  Check 
} from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const beneficios = [
    {
      title: "Solicitações Ilimitadas",
      description: "Envie quantas solicitações de design você precisar sem limites."
    },
    {
      title: "Entrega Mais Rápida",
      description: "Receba seus designs em tempo recorde, acelerando seus projetos."
    },
    {
      title: "Revisões Ilimitadas",
      description: "Peça quantas revisões forem necessárias até a perfeição."
    },
    {
      title: "Equipe Dedicada",
      description: "Tenha uma equipe de design focada exclusivamente em seus projetos."
    },
    {
      title: "Designers Top 1%",
      description: "Trabalhe com os melhores talentos do mercado de design."
    }
  ];

  const comofunciona = [
    {
      numero: "01",
      title: "Envie Sua Solicitação de Design",
      description: "Envie solicitações através do formulário guiado pela IA do KIMP360. Seu Gerente de Projeto revisará e o manterá atualizado sobre os próximos passos."
    },
    {
      numero: "02",
      title: "Trabalhe Com Sua Equipe de Design",
      description: "Seu Gerente de Projeto e equipe de design dedicada trabalharão em suas solicitações, manterão você atualizado e submeterão designs para seu feedback."
    },
    {
      numero: "03",
      title: "Revise, Aprove, Repita",
      description: "Revise designs no KIMP360, forneça feedback através de comentários, anotações ou gravações de tela. Depois, continue enviando novas solicitações ilimitadas."
    }
  ];

  const servicosDiseño = [
    {
      title: "Design Gráfico",
      description: "Criamos gráficos para branding e campanhas publicitárias para amplificar os esforços de marketing.",
      icon: <Palette className="h-8 w-8" />
    },
    {
      title: "Ilustrações Personalizadas",
      description: "Obtenha ilustrações personalizadas desde logos até conceitos experimentais de marketing.",
      icon: <PenTool className="h-8 w-8" />
    },
    {
      title: "Identidade Visual",
      description: "Não tem uma identidade visual? Nos diga o que você gostaria e criaremos para você.",
      icon: <Eye className="h-8 w-8" />
    },
    {
      title: "Apresentações",
      description: "Criamos designs envolventes para tudo, desde pitch decks até apresentações corporativas.",
      icon: <Presentation className="h-8 w-8" />
    },
    {
      title: "Designs Web & App",
      description: "Designs impressionantes e fáceis de usar para interfaces digitais.",
      icon: <Smartphone className="h-8 w-8" />
    }
  ];

  const recursosDestaque = [
    {
      title: "Fluxo de Trabalho Simplificado com TAREFFA360",
      description: "TAREFFA360 é uma plataforma alimentada por IA que simplifica solicitações de design com fluxos de trabalho fáceis, feedback eficiente e organização perfeita para elevar projetos sem esforço e sempre melhorar a colaboração."
    },
    {
      title: "Gestão de Design Mais Rápida",
      description: "Crie, gerencie e colabore em solicitações de design rapidamente e facilmente em um único local centralizado. Tenha uma visão de 360° organizada do seu jeito."
    },
    {
      title: "Projete Melhor, Como Uma Equipe",
      description: "Convide quantos colaboradores quiser para ajudar a criar e gerenciar solicitações de design no TAREFFA360 com sua Equipe de Design Dedicada."
    },
    {
      title: "Ativos de Marca em Um Só Lugar",
      description: "Não perca mais tempo explicando sua marca. Faça upload de todos os seus ativos e depois os anexe com apenas alguns cliques ao criar novas solicitações de design."
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12 space-y-16">
      <section className="text-center space-y-6">
        <h1 className="text-4xl font-bold text-primary">
          Desbloqueie o Potencial de Design Ilimitado para seu Negócio
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          TAREFFA360: Designs Ilimitados, Gerenciamento Descomplicado.
          Essa é a Promessa da TAREFFA.
        </p>
        <div className="flex justify-center gap-4">
          <Button onClick={() => navigate("/orders/new")}>
            Começar Agora
          </Button>
          <Button variant="outline">
            Saiba Mais
          </Button>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-center mb-8">
          Descubra os Benefícios-Chave da Tareffa
        </h2>
        <div className="grid md:grid-cols-5 gap-4">
          {beneficios.map((beneficio, index) => (
            <div key={index} className="text-center space-y-2 p-4 workspace-card">
              <Check className="mx-auto h-10 w-10 text-primary" />
              <h3 className="font-semibold">{beneficio.title}</h3>
              <p className="text-sm text-muted-foreground">{beneficio.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-center mb-8">
          Como Funciona a Assinatura Tareffa
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {comofunciona.map((etapa, index) => (
            <div key={index} className="space-y-4 p-6 workspace-card">
              <div className="text-6xl font-bold text-primary opacity-20">{etapa.numero}</div>
              <h3 className="text-xl font-semibold">{etapa.title}</h3>
              <p className="text-muted-foreground">{etapa.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-center mb-8">
          Serviços de Design
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {servicosDiseño.map((servico, index) => (
            <div key={index} className="text-center space-y-4 p-6 workspace-card">
              <div className="flex justify-center text-primary">{servico.icon}</div>
              <h3 className="font-semibold text-xl">{servico.title}</h3>
              <p className="text-muted-foreground">{servico.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-center mb-8">
          Recursos em Destaque do TAREFFA360
        </h2>
        <div className="space-y-4">
          {recursosDestaque.map((recurso, index) => (
            <div key={index} className="p-6 workspace-card">
              <h3 className="text-xl font-semibold mb-2">{recurso.title}</h3>
              <p className="text-muted-foreground">{recurso.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="text-center">
        <h2 className="text-3xl font-bold mb-4">
          Introduzindo TAREFFA360
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          Designs Ilimitados, Gerenciamento Descomplicado. 
          Essa é a Promessa da TAREFFA.
        </p>
        <Button size="lg" onClick={() => navigate("/orders/new")}>
          Experimente Agora
        </Button>
      </section>
    </div>
  );
};

export default Index;
