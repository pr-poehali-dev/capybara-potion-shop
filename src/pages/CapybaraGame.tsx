
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CapybaraCustomer } from '@/components/CapybaraCustomer';
import { PotionShop } from '@/components/PotionShop';
import { toast } from '@/components/ui/use-toast';

interface Potion {
  id: number;
  name: string;
  type: 'color' | 'transform' | 'other' | 'special';
  color?: string;
  icon: string;
}

interface Ingredient {
  id: string;
  name: string;
  icon: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic';
  category: 'herb' | 'crystal' | 'essence' | 'other';
  description: string;
}

interface Customer {
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
    requiredIngredient?: string;
  };
}

const potions: Potion[] = [
  { id: 1, name: 'Зелье изменения цвета', type: 'color', icon: '🧪' },
  { id: 2, name: 'Зелье превращения', type: 'transform', icon: '⚗️' },
  { id: 3, name: 'Лечебное зелье', type: 'other', icon: '💊' },
  { id: 4, name: 'Зелье силы', type: 'other', icon: '💪' },
  { id: 5, name: 'Особое зелье', type: 'special', icon: '✨' },
];

const ingredients: Ingredient[] = [
  { id: 'moonflower', name: 'Лунный цветок', icon: '🌙🌸', rarity: 'rare', category: 'herb', description: 'Собирается только при полной луне, придаёт зельям мистические свойства' },
  { id: 'icecalamasi', name: 'Ледяной каламаси', icon: '❄️🍋', rarity: 'uncommon', category: 'herb', description: 'Растёт в северных землях, придаёт зельям охлаждающий эффект' },
  { id: 'dragonscale', name: 'Чешуя дракона', icon: '🐉⚡', rarity: 'epic', category: 'essence', description: 'Редкий ингредиент, значительно усиливает эффект зелья' },
  { id: 'sunberry', name: 'Солнечная ягода', icon: '☀️🍓', rarity: 'common', category: 'herb', description: 'Наполняет зелья энергией и теплом' },
  { id: 'stardust', name: 'Звёздная пыль', icon: '✨💫', rarity: 'rare', category: 'essence', description: 'Делает эффект зелья более продолжительным' },
  { id: 'cloudessence', name: 'Эссенция облаков', icon: '☁️💧', rarity: 'uncommon', category: 'essence', description: 'Делает зелья более лёгкими и воздушными' },
  { id: 'ambercrystal', name: 'Янтарный кристалл', icon: '🔶💎', rarity: 'rare', category: 'crystal', description: 'Сохраняет древнюю энергию, стабилизирует зелья' },
  { id: 'nightshade', name: 'Ночной пасленник', icon: '🌑🌿', rarity: 'uncommon', category: 'herb', description: 'Обладает мощными магическими свойствами' },
  { id: 'phoenixfeather', name: 'Перо феникса', icon: '🔥🪶', rarity: 'epic', category: 'other', description: 'Придаёт зельям возрождающие свойства' },
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
  { color: 'transparent', name: 'Прозрачный', hex: 'rgba(255, 255, 255, 0.3)' },
];

const animalSpirits = [
  { animal: 'frog', name: 'лягушка', emoji: '🐸' },
  { animal: 'mouse', name: 'мышь', emoji: '🐭' },
  { animal: 'bird', name: 'птица', emoji: '🐦' },
  { animal: 'fish', name: 'рыба', emoji: '🐟' },
  { animal: 'rabbit', name: 'кролик', emoji: '🐰' },
  { animal: 'cat', name: 'кошка', emoji: '🐱' },
  { animal: 'owl', name: 'сова', emoji: '🦉' },
  { animal: 'turtle', name: 'черепаха', emoji: '🐢' },
  { animal: 'fire', name: 'элементаль огня', emoji: '🔥' },
  { animal: 'water', name: 'элементаль воды', emoji: '💧' },
  { animal: 'earth', name: 'элементаль земли', emoji: '🪨' },
  { animal: 'air', name: 'элементаль воздуха', emoji: '💨' },
  { animal: 'ice', name: 'элементаль льда', emoji: '❄️' },
];

const specialPotions = [
  { id: 'golden', name: 'Золотое сияние', icon: '🌟', requiredName: 'Филимон' },
  { id: 'rainbow', name: 'Радужное мерцание', icon: '🌈', requiredName: 'Матильда' },
  { id: 'moonlight', name: 'Лунное свечение', icon: '🌙', requiredName: 'Клавдия' },
  { id: 'cosmic', name: 'Космическая энергия', icon: '🌌', requiredName: 'Никодим' },
  { id: 'starlight', name: 'Звёздный свет', icon: '⭐', requiredName: 'Аркадий' },
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

// Сопоставление зелий с нужными ингредиентами
const getPotentialIngredients = (potionType: string, specificType?: string): Ingredient[] => {
  switch (potionType) {
    case 'color':
      // Разные ингредиенты для разных цветов
      if (specificType === 'transparent') return ingredients.filter(i => i.id === 'cloudessence' || i.id === 'moonflower');
      if (specificType === 'red' || specificType === 'crimson') return ingredients.filter(i => i.id === 'sunberry' || i.id === 'phoenixfeather');
      if (specificType === 'blue') return ingredients.filter(i => i.id === 'icecalamasi' || i.id === 'cloudessence');
      if (specificType === 'green') return ingredients.filter(i => i.id === 'nightshade' || i.id === 'sunberry');
      if (specificType === 'purple') return ingredients.filter(i => i.id === 'nightshade' || i.id === 'moonflower');
      return ingredients.filter(i => i.category === 'herb' || i.category === 'essence');
      
    case 'transform':
      // Разные ингредиенты для разных трансформаций
      if (specificType === 'fire' || specificType === 'ice') return ingredients.filter(i => i.id === 'phoenixfeather' || i.id === 'icecalamasi' || i.id === 'dragonscale');
      if (specificType === 'water' || specificType === 'air') return ingredients.filter(i => i.id === 'cloudessence' || i.id === 'stardust');
      if (specificType === 'earth') return ingredients.filter(i => i.id === 'ambercrystal' || i.id === 'sunberry');
      return ingredients.filter(i => i.category === 'essence' || i.category === 'other');
      
    case 'special':
      // Особые зелья требуют редких ингредиентов
      return ingredients.filter(i => i.rarity === 'rare' || i.rarity === 'epic');
      
    default:
      // Лечебные и силовые зелья
      return ingredients.filter(i => i.category === 'herb' || i.category === 'crystal');
  }
};

const CapybaraGame = () => {
  const [score, setScore] = useState(0);
  const [currentCustomer, setCurrentCustomer] = useState<Customer | null>(null);
  const [selectedPotion, setSelectedPotion] = useState<Potion | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedAnimal, setSelectedAnimal] = useState<string | null>(null);
  const [selectedSpecialPotion, setSelectedSpecialPotion] = useState<string | null>(null);
  const [selectedIngredient, setSelectedIngredient] = useState<string | null>(null);
  const [customerReaction, setCustomerReaction] = useState<string | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [step, setStep] = useState<'select-potion' | 'select-ingredient' | 'final'>('select-potion');
  const [availableIngredients, setAvailableIngredients] = useState<Ingredient[]>([]);

  // Проверка, является ли имя особенным
  const isSpecialName = (name: string) => {
    return specialPotions.some(potion => potion.requiredName === name);
  };

  // Получение специального зелья для имени
  const getSpecialPotionForName = (name: string) => {
    return specialPotions.find(potion => potion.requiredName === name);
  };

  // Выбор случайного ингредиента из доступных
  const getRandomIngredient = (potionType: string, specificValue?: string): Ingredient | null => {
    const potentialIngredients = getPotentialIngredients(potionType, specificValue);
    if (potentialIngredients.length === 0) return null;
    return potentialIngredients[Math.floor(Math.random() * potentialIngredients.length)];
  };

  // Генерация случайного покупателя
  const generateCustomer = () => {
    const randomName = customerNames[Math.floor(Math.random() * customerNames.length)];
    const isSpecial = isSpecialName(randomName.name);
    
    let potionType: 'color' | 'transform' | 'other' | 'special';
    let potionDetails = '';
    let colorEssence;
    let transformAnimal;
    let specialPotion;
    let requiredIngredient;
    
    // У особенных покупателей есть 50% шанс запросить особое зелье
    if (isSpecial && Math.random() > 0.5) {
      potionType = 'special';
      const specialPotionInfo = getSpecialPotionForName(randomName.name);
      if (specialPotionInfo) {
        const randomIngredient = getRandomIngredient('special');
        if (randomIngredient) {
          requiredIngredient = randomIngredient.id;
          potionDetails = `Мне нужно особое зелье "${specialPotionInfo.name}" с добавлением ${randomIngredient.name}! Только оно поможет мне!`;
        } else {
          potionDetails = `Мне нужно особое зелье "${specialPotionInfo.name}"! Только оно поможет мне!`;
        }
        specialPotion = specialPotionInfo.id;
      }
    } else {
      potionType = ['color', 'transform', 'other'][Math.floor(Math.random() * 3)] as 'color' | 'transform' | 'other';
      
      if (potionType === 'color') {
        const randomColor = colorEssences[Math.floor(Math.random() * colorEssences.length)];
        colorEssence = randomColor.color;
        
        // 70% шанс запросить ингредиент для зелья
        if (Math.random() > 0.3) {
          const randomIngredient = getRandomIngredient('color', randomColor.color);
          if (randomIngredient) {
            requiredIngredient = randomIngredient.id;
            potionDetails = `Я хочу ${randomColor.name} цвет с добавлением ${randomIngredient.name}!`;
          } else {
            potionDetails = `Я хочу ${randomColor.name} цвет!`;
          }
        } else {
          potionDetails = `Я хочу ${randomColor.name} цвет!`;
        }
      } else if (potionType === 'transform') {
        const randomAnimal = animalSpirits[Math.floor(Math.random() * animalSpirits.length)];
        transformAnimal = randomAnimal.animal;
        
        // 70% шанс запросить ингредиент для зелья
        if (Math.random() > 0.3) {
          const randomIngredient = getRandomIngredient('transform', randomAnimal.animal);
          if (randomIngredient) {
            requiredIngredient = randomIngredient.id;
            potionDetails = `Хочу превратиться в ${randomAnimal.name} с помощью зелья с ${randomIngredient.name}!`;
          } else {
            potionDetails = `Хочу превратиться в ${randomAnimal.name}!`;
          }
        } else {
          potionDetails = `Хочу превратиться в ${randomAnimal.name}!`;
        }
      } else {
        const otherPotions = ['стать сильнее', 'вылечить простуду', 'стать невидимым', 'читать мысли'];
        const randomOther = otherPotions[Math.floor(Math.random() * otherPotions.length)];
        
        // 70% шанс запросить ингредиент для зелья
        if (Math.random() > 0.3) {
          const randomIngredient = getRandomIngredient('other');
          if (randomIngredient) {
            requiredIngredient = randomIngredient.id;
            potionDetails = `Мне нужно ${randomOther} с использованием ${randomIngredient.name}!`;
          } else {
            potionDetails = `Мне нужно ${randomOther}!`;
          }
        } else {
          potionDetails = `Мне нужно ${randomOther}!`;
        }
      }
    }

    return {
      id: Date.now(),
      name: randomName.name,
      gender: randomName.gender,
      isSpecial,
      avatar: `🦫`,
      request: {
        potionType,
        potionDetails,
        colorEssence,
        transformAnimal,
        specialPotion,
        requiredIngredient
      }
    };
  };

  // Начало игры
  const startGame = () => {
    setGameStarted(true);
    setCurrentCustomer(generateCustomer());
    setScore(0);
    setCustomerReaction(null);
    setStep('select-potion');
  };

  // Получение реакции на правильное зелье
  const getHappyReaction = () => {
    if (!currentCustomer) return "Спасибо!";
    
    const ingredientDetails = currentCustomer.request.requiredIngredient
      ? ` с ${ingredients.find(i => i.id === currentCustomer.request.requiredIngredient)?.name || 'особым ингредиентом'}`
      : '';
    
    // Реакция на особое зелье
    if (currentCustomer.request.potionType === 'special' && currentCustomer.request.specialPotion) {
      const potionInfo = specialPotions.find(p => p.id === currentCustomer.request.specialPotion);
      return `Невероятно! ${potionInfo?.icon} "${potionInfo?.name}"${ingredientDetails} - это именно то, что мне нужно! Ты настоящий мастер зельеварения, Виолетта! Ты спасла меня!`;
    }
    
    // Реакция на зелье цвета
    if (currentCustomer.request.potionType === 'color' && currentCustomer.request.colorEssence) {
      const colorName = colorEssences.find(c => c.color === currentCustomer.request.colorEssence)?.name;
      
      if (currentCustomer.request.colorEssence === 'transparent') {
        return `Ух ты! Я ${colorName}${ingredientDetails}! Теперь меня почти не видно! Какое волшебство!`;
      }
      
      return `Ух ты! Я ${colorName}${ingredientDetails}! Выглядит потрясающе! ${currentCustomer.gender === 'female' ? 'Сияю' : 'Сияю'} как звезда!`;
    }
    
    // Реакция на зелье трансформации
    if (currentCustomer.request.potionType === 'transform' && currentCustomer.request.transformAnimal) {
      const animalName = animalSpirits.find(a => a.animal === currentCustomer.request.transformAnimal)?.name;
      const animalEmoji = animalSpirits.find(a => a.animal === currentCustomer.request.transformAnimal)?.emoji;
      
      // Специальные реакции для элементалей
      if (['fire', 'water', 'earth', 'air', 'ice'].includes(currentCustomer.request.transformAnimal)) {
        const elementalResponses = {
          'fire': `Ух ты! Я ${animalName}${ingredientDetails}! ${animalEmoji} Чувствую, как пламя пылает внутри меня!`,
          'water': `Ух ты! Я ${animalName}${ingredientDetails}! ${animalEmoji} Ощущаю силу течения и прохладу глубин!`,
          'earth': `Ух ты! Я ${animalName}${ingredientDetails}! ${animalEmoji} Какая мощь! Я тверд как камень!`,
          'air': `Ух ты! Я ${animalName}${ingredientDetails}! ${animalEmoji} Чувствую легкость! Я могу парить в воздухе!`,
          'ice': `Ух ты! Я ${animalName}${ingredientDetails}! ${animalEmoji} Прохладно! Но так красиво и величественно!`
        };
        
        return elementalResponses[currentCustomer.request.transformAnimal as keyof typeof elementalResponses];
      }
      
      return `Ух ты! Я ${animalName}${ingredientDetails}! ${animalEmoji} Какое чудо! Спасибо, Виолетта!`;
    }
    
    // Реакция на другие зелья
    const otherReactions = [
      `Именно то, что мне нужно${ingredientDetails}! Спасибо!`,
      `Превосходно${ingredientDetails}! У тебя золотые руки!`,
      `Боже, как хорошо${ingredientDetails}! Обязательно вернусь к тебе ещё!`,
      `Вот это да${ingredientDetails}! Сразу чувствую эффект!`
    ];
    
    return otherReactions[Math.floor(Math.random() * otherReactions.length)];
  };

  // Проверка правильности выбранного зелья
  const checkBasePotion = () => {
    if (!currentCustomer || !selectedPotion) return;
    
    let isCorrect = selectedPotion.type === currentCustomer.request.potionType;
    
    // Дополнительная проверка для цветных зелий
    if (isCorrect && currentCustomer.request.potionType === 'color' && 
        selectedColor !== currentCustomer.request.colorEssence) {
      isCorrect = false;
    }
    
    // Дополнительная проверка для зелий трансформации
    if (isCorrect && currentCustomer.request.potionType === 'transform' && 
        selectedAnimal !== currentCustomer.request.transformAnimal) {
      isCorrect = false;
    }
    
    // Дополнительная проверка для особых зелий
    if (isCorrect && currentCustomer.request.potionType === 'special' && 
        selectedSpecialPotion !== currentCustomer.request.specialPotion) {
      isCorrect = false;
    }
    
    if (!isCorrect) {
      setCustomerReaction("Это не то зелье, которое я просил... 😔");
      
      toast({
        title: "Ой!",
        description: "Это не то основное зелье, которое нужно клиенту!",
        variant: "destructive"
      });
      
      setScore(prev => Math.max(0, prev - 5));
      
      // Новый клиент через некоторое время
      setTimeout(() => {
        setCurrentCustomer(generateCustomer());
        setSelectedPotion(null);
        setSelectedColor(null);
        setSelectedAnimal(null);
        setSelectedSpecialPotion(null);
        setSelectedIngredient(null);
        setCustomerReaction(null);
        setStep('select-potion');
      }, 3000);
      
      return;
    }
    
    // Зелье правильное, проверяем нужен ли ингредиент
    if (currentCustomer.request.requiredIngredient) {
      // Переходим к выбору ингредиента
      toast({
        title: "Хорошо!",
        description: "Теперь нужно добавить правильный ингредиент",
      });
      
      // Определяем, какие ингредиенты подходят для этого зелья
      let potentialIngredients;
      if (currentCustomer.request.potionType === 'color') {
        potentialIngredients = getPotentialIngredients('color', currentCustomer.request.colorEssence);
      } else if (currentCustomer.request.potionType === 'transform') {
        potentialIngredients = getPotentialIngredients('transform', currentCustomer.request.transformAnimal);
      } else if (currentCustomer.request.potionType === 'special') {
        potentialIngredients = getPotentialIngredients('special');
      } else {
        potentialIngredients = getPotentialIngredients('other');
      }
      
      setAvailableIngredients(potentialIngredients);
      setStep('select-ingredient');
    } else {
      // Если ингредиент не нужен, завершаем
      finishPotion();
    }
  };
  
  // Проверка правильности выбранного ингредиента и завершение приготовления
  const checkIngredient = () => {
    if (!currentCustomer || !selectedIngredient) return;
    
    const isIngredientCorrect = selectedIngredient === currentCustomer.request.requiredIngredient;
    
    if (isIngredientCorrect) {
      finishPotion(true);
    } else {
      setCustomerReaction("Ингредиент не тот... А зелье было почти идеальным! 😔");
      
      toast({
        title: "Почти получилось!",
        description: "Ингредиент не подошел для этого зелья.",
        variant: "destructive"
      });
      
      setScore(prev => Math.max(0, prev - 2));
      
      // Новый клиент через некоторое время
      setTimeout(() => {
        setCurrentCustomer(generateCustomer());
        setSelectedPotion(null);
        setSelectedColor(null);
        setSelectedAnimal(null);
        setSelectedSpecialPotion(null);
        setSelectedIngredient(null);
        setCustomerReaction(null);
        setStep('select-potion');
      }, 3000);
    }
  };
  
  // Завершение приготовления зелья
  const finishPotion = (withIngredient = false) => {
    if (!currentCustomer) return;
    
    const reaction = getHappyReaction();
    setCustomerReaction(reaction);
    
    // Бонусные очки за правильные ингредиенты
    let pointsToAdd = 0;
    
    if (currentCustomer.request.potionType === 'special') {
      pointsToAdd = 25;
    } else {
      pointsToAdd = 10;
    }
    
    // Дополнительные очки за правильный ингредиент
    if (withIngredient) {
      const ingredient = ingredients.find(i => i.id === currentCustomer.request.requiredIngredient);
      if (ingredient) {
        switch (ingredient.rarity) {
          case 'common': pointsToAdd += 5; break;
          case 'uncommon': pointsToAdd += 10; break;
          case 'rare': pointsToAdd += 15; break;
          case 'epic': pointsToAdd += 25; break;
        }
      }
    }
    
    toast({
      title: withIngredient ? "Идеально!" : "Правильно!",
      description: withIngredient
        ? `Клиент в восторге от вашего зелья с идеальным ингредиентом! +${pointsToAdd} очков`
        : `Клиент доволен вашим зельем! +${pointsToAdd} очков`,
    });
    
    setScore(prev => prev + pointsToAdd);
    setStep('final');
    
    // Новый клиент через некоторое время
    setTimeout(() => {
      setCurrentCustomer(generateCustomer());
      setSelectedPotion(null);
      setSelectedColor(null);
      setSelectedAnimal(null);
      setSelectedSpecialPotion(null);
      setSelectedIngredient(null);
      setCustomerReaction(null);
      setStep('select-potion');
    }, 3000);
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
            <div className="bg-[#FFF0B3] p-3 rounded-lg border border-[#C2A87D] text-sm">
              <p className="font-semibold text-[#6B4226]">Новое обновление:</p>
              <p className="text-[#8A6E52]">
                Теперь клиенты могут просить добавить особые ингредиенты в зелья! 
                Внимательно слушай их пожелания и выбирай правильные ингредиенты для усиления эффекта.
              </p>
            </div>
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
            <CapybaraCustomer customer={currentCustomer} reaction={customerReaction} />
          )}
          
          {step === 'select-potion' && (
            <>
              <PotionShop 
                potions={potions} 
                colorEssences={colorEssences}
                animalSpirits={animalSpirits}
                specialPotions={specialPotions}
                selectedPotion={selectedPotion}
                setSelectedPotion={setSelectedPotion}
                selectedColor={selectedColor}
                setSelectedColor={setSelectedColor}
                selectedAnimal={selectedAnimal}
                setSelectedAnimal={setSelectedAnimal}
                selectedSpecialPotion={selectedSpecialPotion}
                setSelectedSpecialPotion={setSelectedSpecialPotion}
                currentCustomerName={currentCustomer?.name || ''}
              />
              
              <div className="mt-4 flex justify-center">
                <Button 
                  onClick={checkBasePotion} 
                  disabled={
                    !selectedPotion || 
                    (selectedPotion.type === 'color' && !selectedColor) ||
                    (selectedPotion.type === 'transform' && !selectedAnimal) ||
                    (selectedPotion.type === 'special' && !selectedSpecialPotion)
                  }
                  className="bg-[#A66D4F] hover:bg-[#8A5A3C] text-white px-6 py-3"
                >
                  {currentCustomer?.request.requiredIngredient ? "Выбрать ингредиент" : "Подать зелье"}
                </Button>
              </div>
            </>
          )}
          
          {step === 'select-ingredient' && (
            <>
              <Card className="p-4 bg-[#FFEFD5] border-2 border-[#C2A87D] shadow-md">
                <h3 className="text-xl font-semibold text-[#6B4226] mb-4">Выберите ингредиент для зелья</h3>
                
                <ScrollArea className="h-48 p-2">
                  <div className="grid grid-cols-2 gap-3">
                    {availableIngredients.map(ingredient => (
                      <div 
                        key={ingredient.id}
                        onClick={() => setSelectedIngredient(ingredient.id)}
                        className={`
                          p-3 rounded-lg cursor-pointer transition-all
                          ${selectedIngredient === ingredient.id 
                            ? 'bg-[#A66D4F] text-white' 
                            : ingredient.rarity === 'epic' ? 'bg-gradient-to-r from-[#FFD700] to-[#FFA500] hover:bg-[#E6D5B8]'
                            : ingredient.rarity === 'rare' ? 'bg-gradient-to-r from-[#9370DB] to-[#8A2BE2] text-white hover:bg-[#E6D5B8]'
                            : ingredient.rarity === 'uncommon' ? 'bg-gradient-to-r from-[#32CD32] to-[#228B22] text-white hover:bg-[#E6D5B8]'
                            : 'bg-[#F5E7C9] hover:bg-[#E6D5B8]'
                          }
                        `}
                      >
                        <div className="flex items-center gap-2">
                          <div className="text-2xl">{ingredient.icon}</div>
                          <div>
                            <div className="font-medium">{ingredient.name}</div>
                            <div className="text-xs opacity-80">{ingredient.description}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                
                <div className="mt-4 p-3 bg-[#F5E7C9] rounded-lg">
                  <h4 className="font-semibold text-[#6B4226] mb-2">Выбрано:</h4>
                  {selectedIngredient ? (
                    <div className="flex items-center gap-2">
                      <div className="text-2xl">{ingredients.find(i => i.id === selectedIngredient)?.icon}</div>
                      <div>{ingredients.find(i => i.id === selectedIngredient)?.name}</div>
                    </div>
                  ) : (
                    <div className="text-[#8A6E52] italic">Ничего не выбрано</div>
                  )}
                </div>
              </Card>
              
              <div className="mt-4 flex justify-center gap-3">
                <Button 
                  onClick={() => {
                    setStep('select-potion');
                    setSelectedIngredient(null);
                  }}
                  variant="outline"
                >
                  Назад
                </Button>
                <Button 
                  onClick={checkIngredient} 
                  disabled={!selectedIngredient}
                  className="bg-[#A66D4F] hover:bg-[#8A5A3C] text-white px-6 py-3"
                >
                  Подать зелье с ингредиентом
                </Button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default CapybaraGame;
