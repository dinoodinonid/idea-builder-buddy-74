import { useState, useMemo } from "react";
import { HeroSection } from "@/components/HeroSection";
import { CategoryFilter } from "@/components/CategoryFilter";
import { RecipeCard } from "@/components/RecipeCard";
import { AddRecipeDialog } from "@/components/AddRecipeDialog";
import { RecipeDetailDialog } from "@/components/RecipeDetailDialog";
import { EditRecipeDialog } from "@/components/EditRecipeDialog";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { toast } from "@/hooks/use-toast";
import pastaImage from "@/assets/pasta-recipe.jpg";
import breadImage from "@/assets/bread-recipe.jpg";
import cookiesImage from "@/assets/cookies-recipe.jpg";

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

const initialRecipes: Recipe[] = [
  {
    id: '1',
    title: 'Classic Pasta Primavera',
    description: 'Fresh seasonal vegetables tossed with perfectly cooked pasta in a light herb sauce.',
    image: pastaImage,
    prepTime: 25,
    servings: 4,
    category: 'Dinner',
    difficulty: 'Easy',
    ingredients: [
      '12 oz pasta',
      '2 cups mixed vegetables (bell peppers, zucchini, cherry tomatoes)',
      '3 cloves garlic, minced',
      '1/4 cup olive oil',
      'Fresh basil and parsley',
      '1/2 cup grated Parmesan cheese',
      'Salt and pepper to taste'
    ],
    instructions: [
      'Cook pasta according to package directions until al dente. Drain and reserve 1/2 cup pasta water.',
      'Heat olive oil in a large skillet over medium-high heat.',
      'Add vegetables and sauté for 5-7 minutes until tender-crisp.',
      'Add minced garlic and cook for another minute until fragrant.',
      'Toss the cooked pasta with vegetables, adding pasta water if needed for consistency.',
      'Stir in fresh herbs and Parmesan cheese. Season with salt and pepper.',
      'Serve immediately with extra Parmesan on the side.'
    ]
  },
  {
    id: '2',
    title: 'Artisan Sourdough Bread',
    description: 'Handcrafted sourdough with a perfect crust and airy, tangy interior.',
    image: breadImage,
    prepTime: 45,
    servings: 8,
    category: 'Breakfast',
    difficulty: 'Hard',
    ingredients: [
      '500g bread flour',
      '350ml lukewarm water',
      '100g active sourdough starter',
      '10g sea salt'
    ],
    instructions: [
      'Mix flour and water in a large bowl. Let autolyse for 30 minutes.',
      'Add sourdough starter and mix until well incorporated.',
      'Add salt and mix thoroughly. The dough will be sticky.',
      'Perform 4 sets of stretch and folds every 30 minutes during bulk fermentation.',
      'Let dough bulk ferment for 4-6 hours at room temperature.',
      'Shape the dough and place in a banneton. Refrigerate overnight.',
      'Preheat Dutch oven to 450°F. Score the dough and bake covered for 20 minutes.',
      'Remove lid and bake for 20-25 more minutes until golden brown.',
      'Cool completely before slicing (at least 2 hours).'
    ]
  },
  {
    id: '3',
    title: 'Chocolate Chip Cookies',
    description: 'Crispy edges, chewy centers, and melted chocolate in every bite.',
    image: cookiesImage,
    prepTime: 15,
    servings: 24,
    category: 'Dessert',
    difficulty: 'Easy',
    ingredients: [
      '2 1/4 cups all-purpose flour',
      '1 cup (2 sticks) unsalted butter, softened',
      '3/4 cup brown sugar, packed',
      '1/2 cup granulated sugar',
      '2 large eggs',
      '2 teaspoons vanilla extract',
      '1 teaspoon baking soda',
      '1 teaspoon salt',
      '2 cups chocolate chips'
    ],
    instructions: [
      'Preheat oven to 375°F (190°C). Line baking sheets with parchment paper.',
      'In a large bowl, cream together softened butter and both sugars until light and fluffy.',
      'Beat in eggs one at a time, then add vanilla extract.',
      'In a separate bowl, whisk together flour, baking soda, and salt.',
      'Gradually mix the dry ingredients into the wet ingredients until just combined.',
      'Fold in chocolate chips until evenly distributed.',
      'Drop rounded tablespoons of dough onto prepared baking sheets, spacing 2 inches apart.',
      'Bake for 9-11 minutes until edges are golden brown but centers still look slightly underbaked.',
      'Cool on baking sheet for 5 minutes before transferring to a wire rack.'
    ]
  }
];

const Index = () => {
  const [recipes, setRecipes] = useLocalStorage<Recipe[]>('recipes', initialRecipes);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [showDetailDialog, setShowDetailDialog] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null);
  const [showEditDialog, setShowEditDialog] = useState(false);

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(recipes.map(recipe => recipe.category)));
    return uniqueCategories.sort();
  }, [recipes]);

  const filteredRecipes = useMemo(() => {
    return recipes.filter(recipe => {
      const matchesSearch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          recipe.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          recipe.ingredients.some(ing => ing.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = selectedCategory === 'All' || recipe.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [recipes, searchQuery, selectedCategory]);

  const handleAddRecipe = (newRecipe: Omit<Recipe, 'id'>) => {
    const recipe: Recipe = {
      ...newRecipe,
      id: Date.now().toString(),
    };
    setRecipes(prev => [recipe, ...prev]);
    toast({
      title: "Recipe Added!",
      description: `${recipe.title} has been added to your collection.`,
    });
  };

  const handleUpdateRecipe = (updatedRecipe: Recipe) => {
    setRecipes(prev => prev.map(recipe => 
      recipe.id === updatedRecipe.id ? updatedRecipe : recipe
    ));
    toast({
      title: "Recipe Updated!",
      description: `${updatedRecipe.title} has been updated.`,
    });
  };

  const handleDeleteRecipe = (recipeId: string) => {
    const recipeToDelete = recipes.find(r => r.id === recipeId);
    setRecipes(prev => prev.filter(recipe => recipe.id !== recipeId));
    toast({
      title: "Recipe Deleted",
      description: `${recipeToDelete?.title} has been removed from your collection.`,
      variant: "destructive",
    });
  };

  const handleRecipeClick = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setShowDetailDialog(true);
  };

  const handleEditRecipe = (recipe: Recipe) => {
    setEditingRecipe(recipe);
    setShowEditDialog(true);
    setShowDetailDialog(false);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="animate-fade-in">
          <HeroSection
            onSearch={handleSearch}
            onAddRecipe={() => setShowAddDialog(true)}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </div>
        
        <div className="animate-slide-up">
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map((recipe, index) => (
            <div 
              key={recipe.id} 
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <RecipeCard 
                recipe={recipe} 
                onClick={() => handleRecipeClick(recipe)}
              />
            </div>
          ))}
        </div>

        {filteredRecipes.length === 0 && (
          <div className="text-center py-12 animate-fade-in">
            <h3 className="text-2xl font-semibold text-muted-foreground mb-2">
              No recipes found
            </h3>
            <p className="text-muted-foreground">
              {searchQuery || selectedCategory !== 'All' 
                ? "Try adjusting your search or filter settings." 
                : "Start building your recipe collection by adding your first recipe!"
              }
            </p>
          </div>
        )}

        <AddRecipeDialog
          open={showAddDialog}
          onOpenChange={setShowAddDialog}
          onAddRecipe={handleAddRecipe}
        />

        <RecipeDetailDialog
          recipe={selectedRecipe}
          open={showDetailDialog}
          onOpenChange={setShowDetailDialog}
          onEdit={handleEditRecipe}
          onDelete={handleDeleteRecipe}
        />

        <EditRecipeDialog
          recipe={editingRecipe}
          open={showEditDialog}
          onOpenChange={setShowEditDialog}
          onUpdateRecipe={handleUpdateRecipe}
        />
      </div>
    </div>
  );
};

export default Index;