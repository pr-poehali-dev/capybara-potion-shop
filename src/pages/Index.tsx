
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-[#FFF8E1]">
      <h1 className="text-4xl font-bold text-[#6B4226] mb-6">
        Зельеварня капибары Виолетты
      </h1>
      <div className="text-8xl mb-8">🦫✨</div>
      <p className="text-lg text-center max-w-md mb-8 text-[#8A6E52]">
        Помогите капибаре Виолетте создавать зелья для её посетителей в магической лавке зелий!
      </p>
      <Link to="/capybara-game">
        <Button className="bg-[#A66D4F] hover:bg-[#8A5A3C] text-white text-xl px-8 py-6">
          Начать игру
        </Button>
      </Link>
    </div>
  );
};

export default Index;
