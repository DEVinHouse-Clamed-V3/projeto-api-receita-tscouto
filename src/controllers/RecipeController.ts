import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Recipe } from "../entities/Recipe";
import { RecipeIngredient } from "../entities/RecipeIngredient";

class RecipeController {
  private recipeRepository;
  private recipeIngredientRepository;

  constructor() {
    this.recipeRepository = AppDataSource.getRepository(Recipe);
    this.recipeIngredientRepository =
      AppDataSource.getRepository(RecipeIngredient);
  }

  create = async (req:Request, res:Response) => {
    try {
      console.log(req.body);
      const body = req.body;
      // validar as informações
      const recipe = await this.recipeRepository.save(body);

      // recipe.ingredients.save(body.ingredients)

      body.ingredients.forEach(async (ingredient: { name: string }) => {
        await this.recipeIngredientRepository.save({
          ...ingredient,
          recipe_id: recipe.id,
        });
      });

      res.status(201).json(recipe);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  getAll = async (req:Request, res:Response) => {
    try {
      const recipes = await this.recipeRepository.find({relations: ["ingredients"]});
      res.json(recipes);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  };
}
export default RecipeController