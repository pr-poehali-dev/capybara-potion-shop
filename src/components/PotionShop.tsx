
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Potion {
  id: number;
  name: string;
  type: 'color' | 'transform' | 'other';
  icon: string;
}

interface ColorEssence {
  color: string;
  name: string;
  hex: string;
}

interface PotionShopProps {
  potions: Potion[];
  colorEssences: ColorEssence[];
  selectedPotion: Potion | null;
  setSelectedPotion: (potion: Potion | null) => void;
  selectedColor: string | null;
  setSelectedColor: (color: string | null) => void;
}

export const PotionShop = ({
  potions,
  colorEssences,
  selectedPotion,
  setSelectedPotion,
  selectedColor,
  setSelectedColor
}: PotionShopProps) => {
  const [activeTab, setActiveTab] = useState('potions');

  const handlePotionSelect = (potion: Potion) => {
    setSelectedPotion(potion);
    if (potion.type === 'color') {
      setActiveTab('colors');
    }
  };

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
  };

  return (
    <Card className="p-4 bg-[#FFEFD5] border-2 border-[#C2A87D] shadow-md">
      <h3 className="text-xl font-semibold text-[#6B4226] mb-4">Лавка зелий Виолетты</h3>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4 bg-[#E6D5B8]">
          <TabsTrigger value="potions" className="data-[state=active]:bg-[#A66D4F] data-[state=active]:text-white">
            Зелья
          </TabsTrigger>
          <TabsTrigger 
            value="colors" 
            disabled={!selectedPotion || selectedPotion.type !== 'color'}
            className="data-[state=active]:bg-[#A66D4F] data-[state=active]:text-white"
          >
            Эссенции цвета
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="potions">
          <ScrollArea className="h-48 p-2">
            <div className="grid grid-cols-2 gap-3">
              {potions.map(potion => (
                <div 
                  key={potion.id}
                  onClick={() => handlePotionSelect(potion)}
                  className={`
                    p-3 rounded-lg cursor-pointer transition-all flex items-center gap-2
                    ${selectedPotion?.id === potion.id 
                      ? 'bg-[#A66D4F] text-white' 
                      : 'bg-[#F5E7C9] hover:bg-[#E6D5B8]'
                    }
                  `}
                >
                  <div className="text-2xl">{potion.icon}</div>
                  <div className="text-sm">{potion.name}</div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
        
        <TabsContent value="colors">
          <ScrollArea className="h-48 p-2">
            <div className="grid grid-cols-3 gap-3">
              {colorEssences.map(essence => (
                <div 
                  key={essence.color}
                  onClick={() => handleColorSelect(essence.color)}
                  className={`
                    p-3 rounded-lg cursor-pointer transition-all 
                    ${selectedColor === essence.color 
                      ? 'ring-4 ring-[#A66D4F] ring-opacity-75' 
                      : 'hover:ring-2 hover:ring-[#C2A87D]'
                    }
                  `}
                  style={{ backgroundColor: essence.hex }}
                >
                  <div className="text-center font-semibold text-white text-shadow">
                    {essence.name}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
      
      <div className="mt-4 p-3 bg-[#F5E7C9] rounded-lg">
        <h4 className="font-semibold text-[#6B4226] mb-2">Выбрано:</h4>
        {selectedPotion ? (
          <div className="flex items-center gap-2">
            <div className="text-2xl">{selectedPotion.icon}</div>
            <div>{selectedPotion.name}</div>
            {selectedPotion.type === 'color' && selectedColor && (
              <div 
                className="w-6 h-6 rounded-full ml-2" 
                style={{ 
                  backgroundColor: colorEssences.find(e => e.color === selectedColor)?.hex || '#000' 
                }}
              ></div>
            )}
          </div>
        ) : (
          <div className="text-[#8A6E52] italic">Ничего не выбрано</div>
        )}
      </div>
    </Card>
  );
};
