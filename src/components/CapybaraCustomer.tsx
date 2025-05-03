
import { Card } from '@/components/ui/card';

interface CustomerProps {
  customer: {
    id: number;
    name: string;
    gender: 'male' | 'female';
    isSpecial: boolean;
    avatar: string;
    request: {
      potionType: 'color' | 'transform' | 'other' | 'special';
      potionDetails: string;
      colorEssence?: string;
      transformAnimal?: string;
      specialPotion?: string;
    };
  };
  reaction: string | null;
}

export const CapybaraCustomer = ({ customer, reaction }: CustomerProps) => {
  return (
    <Card className="p-4 mb-6 bg-[#FFDDA3] border-2 border-[#C2A87D] shadow-md">
      <div className="flex items-center gap-4">
        <div className={`text-5xl ${customer.isSpecial ? 'animate-pulse' : ''}`}>
          {customer.avatar}
          {customer.isSpecial && <span className="text-2xl">✨</span>}
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-[#6B4226] flex items-center">
            {customer.name}
            <span className="ml-2 text-sm text-[#8A6E52]">
              {customer.gender === 'male' ? '♂️' : '♀️'}
              {customer.isSpecial && <span className="ml-1">🌟</span>}
            </span>
          </h3>
          <div className="flex items-center mt-2">
            <div className="text-lg mr-2">💬</div>
            <p className={`italic text-[#6B4226] ${customer.isSpecial && !reaction ? 'font-medium' : ''}`}>
              {reaction ? reaction : customer.request.potionDetails}
            </p>
          </div>
        </div>
      </div>
      
      {reaction && (
        <div className="mt-3 animate-fade-in">
          <div className="w-full h-1 bg-[#C2A87D] rounded-full mb-2 animate-pulse"></div>
          <div className="flex justify-end">
            <div className="text-sm text-[#8A6E52] italic">
              Новый клиент скоро появится...
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};
