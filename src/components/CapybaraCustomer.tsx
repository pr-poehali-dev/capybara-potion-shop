
import { Card } from '@/components/ui/card';

interface CustomerProps {
  customer: {
    id: number;
    name: string;
    gender: 'male' | 'female';
    avatar: string;
    request: {
      potionType: 'color' | 'transform' | 'other';
      potionDetails: string;
      colorEssence?: string;
    };
  };
}

export const CapybaraCustomer = ({ customer }: CustomerProps) => {
  return (
    <Card className="p-4 mb-6 bg-[#FFDDA3] border-2 border-[#C2A87D] shadow-md">
      <div className="flex items-center gap-4">
        <div className="text-5xl">{customer.avatar}</div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-[#6B4226]">
            {customer.name}
            <span className="ml-2 text-sm text-[#8A6E52]">
              {customer.gender === 'male' ? '♂️' : '♀️'}
            </span>
          </h3>
          <div className="flex items-center mt-2">
            <div className="text-lg mr-2">💬</div>
            <p className="italic text-[#6B4226]">{customer.request.potionDetails}</p>
          </div>
        </div>
      </div>
    </Card>
  );
};
