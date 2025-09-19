import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Edit, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string;
  prepTime: number;
  servings: number;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  ingredients: string[];
  instructions: string[];
}

interface RecipeDetailDialogProps {
  recipe: Recipe | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit: (recipe: Recipe) => void;
  onDelete: (recipeId: string) => void;
}

export const RecipeDetailDialog = ({ 
  recipe, 
  open, 
  onOpenChange, 
  onEdit, 
  onDelete 
}: RecipeDetailDialogProps) => {
  if (!recipe) return null;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-sage text-sage-foreground';
      case 'Medium': return 'bg-warm-orange text-white';
      case 'Hard': return 'bg-terracotta text-white';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      onDelete(recipe.id);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <DialogTitle className="text-3xl font-bold text-primary pr-8">
              {recipe.title}
            </DialogTitle>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit(recipe)}
                className="transition-all duration-200"
              >
                <Edit className="w-4 h-4 mr-1" />
                Edit
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleDelete}
                className="text-destructive hover:text-destructive transition-all duration-200"
              >
                <Trash2 className="w-4 h-4 mr-1" />
                Delete
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Hero Image */}
          <div className="relative h-64 md:h-80 rounded-xl overflow-hidden">
            <img 
              src={recipe.image} 
              alt={recipe.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 flex gap-2">
              <Badge className={getDifficultyColor(recipe.difficulty)}>
                {recipe.difficulty}
              </Badge>
              <Badge variant="outline" className="bg-white/90 backdrop-blur-sm">
                {recipe.category}
              </Badge>
            </div>
          </div>

          {/* Recipe Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-gradient-to-br from-sage/20 to-sage/10 border-sage/20">
              <CardContent className="p-4 text-center">
                <Clock className="w-8 h-8 mx-auto mb-2 text-sage" />
                <div className="text-2xl font-bold text-sage-foreground">{recipe.prepTime}m</div>
                <div className="text-sm text-muted-foreground">Prep Time</div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-warm-orange/20 to-warm-orange/10 border-warm-orange/20">
              <CardContent className="p-4 text-center">
                <Users className="w-8 h-8 mx-auto mb-2 text-warm-orange" />
                <div className="text-2xl font-bold text-foreground">{recipe.servings}</div>
                <div className="text-sm text-muted-foreground">Servings</div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-terracotta/20 to-terracotta/10 border-terracotta/20">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-foreground">{recipe.difficulty}</div>
                <div className="text-sm text-muted-foreground">Difficulty</div>
              </CardContent>
            </Card>
          </div>

          {/* Description */}
          {recipe.description && (
            <div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Description</h3>
              <p className="text-muted-foreground leading-relaxed">{recipe.description}</p>
            </div>
          )}

          {/* Ingredients */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-foreground">Ingredients</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {recipe.ingredients.map((ingredient, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-cream to-sage/10 border border-sage/20 transition-all duration-200 hover:shadow-sm"
                >
                  <div className="w-2 h-2 rounded-full bg-sage flex-shrink-0" />
                  <span className="text-foreground">{ingredient}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Instructions */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-foreground">Instructions</h3>
            <div className="space-y-4">
              {recipe.instructions.map((instruction, index) => (
                <div 
                  key={index}
                  className="flex gap-4 p-4 rounded-lg bg-gradient-to-r from-cream to-card border border-sage/20 transition-all duration-200 hover:shadow-sm"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-warm-orange to-terracotta text-white flex items-center justify-center font-semibold text-sm">
                    {index + 1}
                  </div>
                  <p className="text-foreground leading-relaxed">{instruction}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};