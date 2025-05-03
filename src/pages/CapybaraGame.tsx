
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CapybaraCustomer } from '@/components/CapybaraCustomer';
import { PotionShop } from '@/components/PotionShop';
import { toast } from '@/components/ui/use-toast';

interface Potion {
  id: number;
  name: string;
  type: 'color' | 'transform' | 'other';
  color?: string;
  icon: string;
}

interface Customer {
  id: number;
  name: string;
  gender: 'male' | 'female';
  avatar: string;
  request: {
    potionType: 'color' | 'transform' | 'other';
    potionDetails: string;
    colorEssence?: string;
  };
}

const potions: Potion[] = [
  { id: 1, name: 'Зелье изменения цвета', type: 'color', icon: '🧪' },
  { id: 2, name: 'Зелье превращения', type: 'transform', icon: '⚗️' },
  { id: 3, name: 'Лечебное зелье', type: 'other', icon: '💊' },
  { id: 4, name: 'Зелье силы', type: 'other', icon: '💪' },
];

const colorEssences = [
  { color: 'red', name: 'Красный', hex: '#FF5555' },
  { color: 'green', name: 'Зелёный', hex: '#55FF55' },
  { color: 'blue', name: 'Синий', hex: '#5555FF' },
  { color: 'pink', name: 'Розовый', hex: '#FF55FF' },
  { color: 'purple', name: 'Фиолетовый', hex: '#AA55FF' },
  { color: 'yellow', name: 'Жёлтый', hex: '#FFFF55' },
  { color: 'orange', name: 'Оранжевый', hex: '#FFAA55' },
  { color: 'crimson', name: 'Багровый', hex: '#DC143C' },
];

const customerNames = [
  { name: 'Аркадий', gender: 'male' },
  { name: 'Матильда', gender: 'female' },
  { name: 'Прокоп', gender: 'male' },
  { name: 'Агафья', gender: 'female' },
  { name: 'Филимон', gender: 'male' },
  { name: 'Клавдия', gender: 'female' },
  { name: 'Никодим', gender: 'male' },
  { name: 'Глафира', gender: 'female' },
];

const CapybaraGame = () => {
  const [score, setScore] = useState(0);
  const [currentCustomer, setCurrentCustomer] = useState<Customer | null>(null);
  const [selectedPotion, setSelectedPotion] = useState<Potion | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [gameStarted, setGameStarted] = useState(false);

  // Генерация случайного покупателя
  const generateCustomer = () => {
    const randomName = customerNames[Math.floor(Math.random() * customerNames.length)];
    const randomPotionType = ['color', 'transform', 'other'][Math.floor(Math.random() * 3)] as 'color' | 'transform' | 'other';
    
    let potionDetails = '';
    let colorEssence;
    
    if (randomPotionType === 'color') {
      const randomColor = colorEssences[Math.floor(Math.random() * colorEssences.length)];
      potionDetails = `Я хочу ${randomColor.name} цвет!`;
      colorEssence = randomColor.color;
    } else if (randomPotionType === 'transform') {
      const transformations = ['лягушку', 'мышь', 'птицу', 'рыбу'];
      const randomTransform = transformations[Math.floor(Math.random() * transformations.length)];
      potionDetails = `Хочу превратиться в ${randomTransform}!`;
    } else {
      const otherPotions = ['стать сильнее', 'вылечить простуду', 'стать невидимым', 'читать мысли'];
      const randomOther = otherPotions[Math.floor(Math.random() * otherPotions.length)];
      potionDetails = `Мне нужно ${randomOther}!`;
    }

    return {
      id: Date.now(),
      name: randomName.name,
      gender: randomName.gender,
      avatar: `🦫`,
      request: {
        potionType: randomPotionType,
        potionDetails,
        colorEssence,
      }
    };
  };

  // Начало игры
  const startGame = () => {
    setGameStarted(true);
    setCurrentCustomer(generateCustomer());
    setScore(0);
  };

  // Проверка правильности выбранного зелья
  const checkPotion = () => {
    if (!currentCustomer || !selectedPotion) return;
    
    let isCorrect = selectedPotion.type === currentCustomer.request.potionType;
    
    // Дополнительная проверка для цветных зелий
    if (isCorrect && currentCustomer.request.potionType === 'color' && 
        selectedColor !== currentCustomer.request.colorEssence) {
      isCorrect = false;
    }
    
    if (isCorrect) {
      toast({
        title: "Правильно!",
        description: "Клиент доволен вашим зельем!",
      });
      setScore(prev => prev + 10);
    } else {
      toast({
        title: "Ой!",
        description: "Это не то зелье, которое нужно клиенту!",
        variant: "destructive"
      });
      setScore(prev => Math.max(0, prev - 5));
    }
    
    // Новый клиент
    setTimeout(() => {
      setCurrentCustomer(generateCustomer());
      setSelectedPotion(null);
      setSelectedColor(null);
    }, 1500);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-[#FFF8E1] p-4">
      <h1 className="text-3xl font-bold text-[#6B4226] mb-4">Зельеварня капибары Виолетты</h1>
      
      {!gameStarted ? (
        <Card className="p-6 w-full max-w-md bg-[#FFF0CE] border-[#C2A87D] shadow-lg">
          <div className="flex flex-col items-center space-y-4">
            <div className="text-6xl mb-2">🦫✨</div>
            <h2 className="text-2xl font-semibold text-[#6B4226]">Добро пожаловать в лавку зелий!</h2>
            <p className="text-center text-[#8A6E52]">
              Я капибара Виолетта, и я занимаюсь приготовлением магических зелий. 
              Помоги мне выполнять заказы других капибар!
            </p>
            <Button 
              onClick={startGame}
              className="bg-[#A66D4F] hover:bg-[#8A5A3C] text-white px-6 py-3"
            >
              Начать игру
            </Button>
          </div>
        </Card>
      ) : (
        <div className="w-full max-w-4xl">
          <div className="flex justify-between items-center mb-4">
            <div className="text-xl font-bold">Счёт: {score}</div>
            <Button onClick={() => setGameStarted(false)} variant="outline">Вернуться в меню</Button>
          </div>
          
          {currentCustomer && (
            <CapybaraCustomer customer={currentCustomer} />
          )}
          
          <PotionShop 
            potions={potions} 
            colorEssences={colorEssences}
            selectedPotion={selectedPotion}
            setSelectedPotion={setSelectedPotion}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
          />
          
          <div className="mt-4 flex justify-center">
            <Button 
              onClick={checkPotion} 
              disabled={!selectedPotion || (selectedPotion.type === 'color' && !selectedColor)}
              className="bg-[#A66D4F] hover:bg-[#8A5A3C] text-white px-6 py-3"
            >
              Подать зелье
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CapybaraGame;
