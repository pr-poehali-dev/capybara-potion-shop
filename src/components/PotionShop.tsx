
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

interface Potion {
  id: number;
  name: string;
  type: 'color' | 'transform' | 'other' | 'special';
  icon: string;
}

interface ColorEssence {
  color: string;
  name: string;
  hex: string;
}

interface AnimalSpirit {
  animal: string;
  name: string;
  emoji: string;
}

interface SpecialPotion {
  id: string;
  name: string;
  icon: string;
  requiredName: string;
}

interface PotionShopProps {
  potions: Potion[];
  colorEssences: ColorEssence[];
  animalSpirits: AnimalSpirit[];
  specialPotions: SpecialPotion[];
  selectedPotion: Potion | null;
  setSelectedPotion: (potion: Potion | null) => void;
  selectedColor: string | null;
  setSelectedColor: (color: string | null) => void;
  selectedAnimal: string | null;
  setSelectedAnimal: (animal: string | null) => void;
  selectedSpecialPotion: string | null;
  setSelectedSpecialPotion: (potion: string | null) => void;
  currentCustomerName: string;
}

export const PotionShop = ({
  potions,
  colorEssences,
  animalSpirits,
  specialPotions,
  selectedPotion,
  setSelectedPotion,
  selectedColor,
  setSelectedColor,
  selectedAnimal,
  setSelectedAnimal,
  selectedSpecialPotion,
  setSelectedSpecialPotion,
  currentCustomerName
}: PotionShopProps) => {
  const [activeTab, setActiveTab] = useState('potions');
  const [availableSpecialPotions, setAvailableSpecialPotions] = useState<SpecialPotion[]>([]);

  useEffect(() => {
    // Фильтрация специальных зелий, доступных для текущего клиента
    const potionsForCustomer = specialPotions.filter(p => p.requiredName === currentCustomerName);
    setAvailableSpecialPotions(potionsForCustomer);
  }, [currentCustomerName, specialPotions]);

  const handlePotionSelect = (potion: Potion) => {
    setSelectedPotion(potion);
    if (potion.type === 'color') {
      setActiveTab('colors');
    } else if (potion.type === 'transform') {
      setActiveTab('animals');
    } else if (potion.type === 'special') {
      setActiveTab('special');
    }
  };

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
  };

  const handleAnimalSelect = (animal: string) => {
    setSelectedAnimal(animal);
  };

  const handleSpecialPotionSelect = (potionId: string) => {
    setSelectedSpecialPotion(potionId);
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
          <TabsTrigger 
            value="animals" 
            disabled={!selectedPotion || selectedPotion.type !== 'transform'}
            className="data-[state=active]:bg-[#A66D4F] data-[state=active]:text-white"
          >
            Духи зверей
          </TabsTrigger>
          <TabsTrigger 
            value="special" 
            disabled={!selectedPotion || selectedPotion.type !== 'special' || availableSpecialPotions.length === 0}
            className="data-[state=active]:bg-[#A66D4F] data-[state=active]:text-white"
          >
            Особые зелья
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
                    p-3 rounded-lg cursor-pointer transition-all flex items-center gap-2 relative
                    ${selectedPotion?.id === potion.id 
                      ? 'bg-[#A66D4F] text-white' 
                      : potion.type === 'special' 
                        ? 'bg-gradient-to-r from-[#F5E7C9] to-[#FFECB3] hover:bg-[#E6D5B8]' 
                        : 'bg-[#F5E7C9] hover:bg-[#E6D5B8]'
                    }
                    ${potion.type === 'special' && availableSpecialPotions.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}
                  `}
                  title={potion.type === 'special' && availableSpecialPotions.length === 0 
                    ? 'Нет доступных особых зелий для текущего клиента' 
                    : ''}
                >
                  <div className="text-2xl">{potion.icon}</div>
                  <div className="text-sm">{potion.name}</div>
                  
                  {potion.type === 'special' && availableSpecialPotions.length > 0 && (
                    <Badge className="absolute top-1 right-1 bg-[#F6C63A] text-[#6B4226]">
                      Доступно
                    </Badge>
                  )}
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
                    p-3 rounded-lg cursor-pointer transition-all relative
                    ${selectedColor === essence.color 
                      ? 'ring-4 ring-[#A66D4F] ring-opacity-75' 
                      : 'hover:ring-2 hover:ring-[#C2A87D]'
                    }
                    ${essence.color === 'transparent' ? 'bg-[#F5E7C9] bg-opacity-30 backdrop-blur' : ''}
                  `}
                  style={essence.color !== 'transparent' ? { backgroundColor: essence.hex } : {}}
                >
                  <div className={`text-center font-semibold ${essence.color === 'transparent' ? 'text-[#6B4226]' : 'text-white text-shadow'}`}>
                    {essence.name}
                  </div>
                  {essence.color === 'transparent' && (
                    <div className="absolute inset-0 rounded-lg border-2 border-dashed border-[#6B4226] border-opacity-50"></div>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
        
        <TabsContent value="animals">
          <ScrollArea className="h-48 p-2">
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2 mb-2 text-sm font-medium text-[#8A6E52]">Животные:</div>
              {animalSpirits.filter(a => !['fire', 'water', 'earth', 'air', 'ice'].includes(a.animal)).map(animal => (
                <div 
                  key={animal.animal}
                  onClick={() => handleAnimalSelect(animal.animal)}
                  className={`
                    p-3 rounded-lg cursor-pointer transition-all flex items-center gap-2
                    ${selectedAnimal === animal.animal 
                      ? 'bg-[#A66D4F] text-white' 
                      : 'bg-[#F5E7C9] hover:bg-[#E6D5B8]'
                    }
                  `}
                >
                  <div className="text-2xl">{animal.emoji}</div>
                  <div>Дух {animal.name}</div>
                </div>
              ))}
              
              <div className="col-span-2 mt-3 mb-2 text-sm font-medium text-[#8A6E52]">Элементали:</div>
              {animalSpirits.filter(a => ['fire', 'water', 'earth', 'air', 'ice'].includes(a.animal)).map(animal => (
                <div 
                  key={animal.animal}
                  onClick={() => handleAnimalSelect(animal.animal)}
                  className={`
                    p-3 rounded-lg cursor-pointer transition-all flex items-center gap-2
                    ${selectedAnimal === animal.animal 
                      ? 'bg-[#A66D4F] text-white' 
                      : animal.animal === 'fire' ? 'bg-gradient-to-r from-amber-500 to-red-600 text-white'
                      : animal.animal === 'water' ? 'bg-gradient-to-r from-blue-300 to-blue-500 text-white'
                      : animal.animal === 'earth' ? 'bg-gradient-to-r from-green-700 to-yellow-700 text-white'
                      : animal.animal === 'air' ? 'bg-gradient-to-r from-blue-100 to-gray-200'
                      : animal.animal === 'ice' ? 'bg-gradient-to-r from-blue-100 to-cyan-300'
                      : 'bg-[#F5E7C9] hover:bg-[#E6D5B8]'
                    }
                  `}
                >
                  <div className="text-2xl">{animal.emoji}</div>
                  <div>Дух {animal.name}</div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
        
        <TabsContent value="special">
          <ScrollArea className="h-48 p-2">
            <div className="grid grid-cols-1 gap-3">
              {availableSpecialPotions.length > 0 ? (
                availableSpecialPotions.map(potion => (
                  <div 
                    key={potion.id}
                    onClick={() => handleSpecialPotionSelect(potion.id)}
                    className={`
                      p-4 rounded-lg cursor-pointer transition-all flex items-center gap-3 
                      ${selectedSpecialPotion === potion.id 
                        ? 'bg-gradient-to-r from-[#F6C63A] to-[#D4A017] text-white' 
                        : 'bg-gradient-to-r from-[#FFF9E6] to-[#FFECB3]'
                      }
                      hover:shadow-md
                    `}
                  >
                    <div className="text-3xl">{potion.icon}</div>
                    <div>
                      <div className="font-semibold text-[#6B4226]">{potion.name}</div>
                      <div className="text-xs text-[#8A6E52]">Специально для {potion.requiredName}</div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-[#8A6E52] italic">
                  Нет доступных особых зелий для текущего клиента
                </div>
              )}
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
              <div>
                + 
                {selectedColor === 'transparent' ? (
                  <span className="inline-flex items-center ml-2">
                    <span className="border border-dashed border-[#6B4226] w-6 h-6 rounded-full ml-2"></span>
                    <span className="ml-1">Прозрачный</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center ml-2">
                    <div 
                      className="w-6 h-6 rounded-full" 
                      style={{ backgroundColor: colorEssences.find(e => e.color === selectedColor)?.hex || '#000' }}
                    ></div>
                    <span className="ml-1">{colorEssences.find(e => e.color === selectedColor)?.name}</span>
                  </span>
                )}
              </div>
            )}
            
            {selectedPotion.type === 'transform' && selectedAnimal && (
              <div className="inline-flex items-center ml-2">
                + 
                <span className="ml-1">
                  Дух {animalSpirits.find(a => a.animal === selectedAnimal)?.name}
                </span>
                <span className="ml-1">
                  {animalSpirits.find(a => a.animal === selectedAnimal)?.emoji}
                </span>
              </div>
            )}
            
            {selectedPotion.type === 'special' && selectedSpecialPotion && (
              <div className="inline-flex items-center ml-2">
                + 
                <span className="ml-1">
                  "{specialPotions.find(p => p.id === selectedSpecialPotion)?.name}"
                </span>
                <span className="ml-1">
                  {specialPotions.find(p => p.id === selectedSpecialPotion)?.icon}
                </span>
              </div>
            )}
          </div>
        ) : (
          <div className="text-[#8A6E52] italic">Ничего не выбрано</div>
        )}
      </div>
    </Card>
  );
};
