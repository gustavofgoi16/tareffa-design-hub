// components/BenefitCard.tsx
import { ReactNode } from "react";

interface BenefitCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export const BenefitCard = ({ icon, title, description }: BenefitCardProps) => (

  
  <div className="flex items-start gap-4 p-5 bg-zinc-900 rounded-2xl shadow-md hover:scale-[1.02] transition">
    <div className="p-2 bg-zinc-800 rounded-xl">{icon}</div>
    <div>
      <h3 className="text-white font-semibold text-lg">{title}</h3>
      <p className="text-gray-400 text-sm mt-1">{description}</p>
    </div>
  </div>
);
export default BenefitCard;
