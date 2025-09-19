import { useState, useMemo } from "react";
import { HeroSection } from "@/components/HeroSection";
import { CategoryFilter } from "@/components/CategoryFilter";
import { RecipeCard } from "@/components/RecipeCard";
import { AddRecipeDialog } from "@/components/AddRecipeDialog";
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
      '2 cups mixed vegetables',
      '3 cloves garlic',
      '1/4 cup olive oil',
      'Fresh herbs',
      'Parmesan cheese'
    ],
    instructions: [
      'Cook pasta according to package directions',
      'Sauté vegetables in olive oil',
      'Add garlic and herbs',
      'Toss with pasta and serve'
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
      '350ml water',
      '100g sourdough starter',
      '10g salt'
    ],
    instructions: [
      'Mix flour and water, let autolyse',
      'Add starter and salt',
      'Perform stretch and folds',
      'Bulk ferment overnight',
      'Shape and final proof',
      'Bake in Dutch oven'
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
      '2 1/4 cups flour',
      '1 cup butter',
      '3/4 cup brown sugar',
      '2 eggs',
      '2 cups chocolate chips'
    ],
    instructions: [
      'Cream butter and sugars',
      'Beat in eggs and vanilla',
      'Mix in flour gradually',
      'Fold in chocolate chips',
      'Bake at 375°F for 9-11 minutes'
    ]
  }
];

const Index = () => {
  const [recipes, setRecipes] = useState<Recipe[]>(initialRecipes);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showAddDialog, setShowAddDialog] = useState(false);

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(recipes.map(recipe => recipe.category)));
    return uniqueCategories.sort();
  }, [recipes]);

  const filteredRecipes = useMemo(() => {
    return recipes.filter(recipe => {
      const matchesSearch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          recipe.description.toLowerCase().includes(searchQuery.toLowerCase());
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
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <HeroSection
          onSearch={handleSearch}
          onAddRecipe={() => setShowAddDialog(true)}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>

        {filteredRecipes.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-2xl font-semibold text-muted-foreground mb-2">
              No recipes found
            </h3>
            <p className="text-muted-foreground">
              Try adjusting your search or add a new recipe!
            </p>
          </div>
        )}

        <AddRecipeDialog
          open={showAddDialog}
          onOpenChange={setShowAddDialog}
          onAddRecipe={handleAddRecipe}
        />
      </div>
    </div>
  );
};

export default Index;