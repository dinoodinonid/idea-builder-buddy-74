import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users } from "lucide-react";

interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string;
  prepTime: number;
  servings: number;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

interface RecipeCardProps {
  recipe: Recipe;
  onClick?: () => void;
}

export const RecipeCard = ({ recipe, onClick }: RecipeCardProps) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-sage text-sage-foreground';
      case 'Medium': return 'bg-warm-orange text-white';
      case 'Hard': return 'bg-terracotta text-white';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Card 
      className="group cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-[var(--shadow-card)] hover:-translate-y-1 bg-gradient-to-b from-cream to-card border-sage/20"
      onClick={onClick}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={recipe.image} 
          alt={recipe.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-3 right-3">
          <Badge className={getDifficultyColor(recipe.difficulty)}>
            {recipe.difficulty}
          </Badge>
        </div>
      </div>
      <CardContent className="p-4">
        <div className="space-y-2">
          <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
            {recipe.title}
          </h3>
          <p className="text-muted-foreground text-sm line-clamp-2">
            {recipe.description}
          </p>
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{recipe.prepTime}m</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>{recipe.servings}</span>
              </div>
            </div>
            <Badge variant="outline" className="border-sage text-sage-foreground">
              {recipe.category}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};