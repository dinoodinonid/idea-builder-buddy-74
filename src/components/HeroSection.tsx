import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus } from "lucide-react";
import heroImage from "@/assets/hero-cooking.jpg";

interface HeroSectionProps {
  onSearch: (query: string) => void;
  onAddRecipe: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const HeroSection = ({ onSearch, onAddRecipe, searchQuery, setSearchQuery }: HeroSectionProps) => {
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <div className="relative h-[60vh] overflow-hidden rounded-2xl mb-8">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
      
      <div className="relative h-full flex flex-col justify-center px-8 md:px-12">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
            Your Personal
            <span className="block bg-gradient-to-r from-warm-orange to-terracotta bg-clip-text text-transparent">
              Recipe Collection
            </span>
          </h1>
          <p className="text-xl text-white/90 mb-8 leading-relaxed">
            Discover, save, and organize your favorite recipes. From family classics to new discoveries.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <form onSubmit={handleSearch} className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search recipes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white/95 backdrop-blur-sm border-white/20 h-12 text-lg"
                />
              </div>
            </form>
            <Button 
              onClick={onAddRecipe}
              size="lg"
              className="bg-gradient-to-r from-warm-orange to-terracotta hover:from-terracotta hover:to-warm-orange text-white px-8 h-12 font-semibold transition-all duration-300 shadow-elegant"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Recipe
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};