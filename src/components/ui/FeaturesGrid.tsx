import { Check, Clock, RefreshCw, Users, Star } from "lucide-react";

const features = [
  {
    icon: <Check className="w-6 h-6 text-primary" />,
    title: "Solicitações Ilimitadas",
    description: "Envie quantas solicitações de design você precisar sem limites.",
  },
  {
    icon: <Clock className="w-6 h-6 text-primary" />,
    title: "Entrega Mais Rápida",
    description: "Receba seus designs em tempo recorde, acelerando seus projetos.",
  },
  {
    icon: <RefreshCw className="w-6 h-6 text-primary" />,
    title: "Revisões Ilimitadas",
    description: "Peça quantas revisões forem necessárias até a perfeição.",
  },
  {
    icon: <Users className="w-6 h-6 text-primary" />,
    title: "Equipe Dedicada",
    description: "Tenha uma equipe de design focada exclusivamente em seus projetos.",
  },
  {
    icon: <Star className="w-6 h-6 text-primary" />,
    title: "Designers Top 1%",
    description: "Trabalhe com os melhores talentos do mercado de design.",
  },
];

export function FeaturesGrid() {
  return (
    <div className="flex flex-wrap justify-center gap-6">
      {features.map((feature, i) => (
        <div
          key={i}
          className="w-[380px] h-[220px] border border-border rounded-2xl p-6 flex flex-col items-start justify-start space-y-4 bg-card shadow-sm"
        >
          {feature.icon}
          <h3 className="text-lg font-semibold">{feature.title}</h3>
          <p className="text-muted-foreground text-sm">{feature.description}</p>
        </div>
      ))}
    </div>
  );
}
    