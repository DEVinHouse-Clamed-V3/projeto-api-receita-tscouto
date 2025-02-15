// import { Request, Response } from "express";
// import { AppDataSource } from "../data-source";
// import { Recipe } from "../entities/Recipe";
// import { RecipeIngredient } from "../entities/RecipeIngredient";
// import { RecipeSteps } from "../entities/RecipeSteps";

// class RecipeController {
//   private recipeRepository;
//   private recipeIngredientRepository;

//   constructor() {
//     this.recipeRepository = AppDataSource.getRepository(Recipe);
//     this.recipeIngredientRepository =
//       AppDataSource.getRepository(RecipeIngredient),
//   }

//   create = async (req:Request, res:Response) => {
//     try {
//       console.log(req.body);
//       const body = req.body;
//       // validar as informações
//       const recipe = await this.recipeRepository.save(body);

//       // recipe.ingredients.save(body.ingredients)

//       body.ingredients.forEach(async (ingredient: { name: string }) => {
//         await this.recipeIngredientRepository.save({
//           ...ingredient,
//           recipe_id: recipe.id,
//         });
//       });

//       res.status(201).json(recipe);
//     } catch (error) {
//       console.log(error);
//       res.status(500).json({ message: "Internal server error" });
//     }
//   };

//   getAll = async (req:Request, res:Response) => {
//     try {
//       const recipes = await this.recipeRepository.find({relations: ["ingredients"]});
//       res.json(recipes);
//     } catch (error) {
//       res.status(500).json({ message: "Internal server error" });
//     }
//   };
// }
// export default RecipeController


import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Recipe } from "../entities/Recipe";
import { RecipeIngredient } from "../entities/RecipeIngredient";
import { RecipeSteps } from "../entities/RecipeSteps";

class RecipeController {
  private recipeRepository;
  private recipeIngredientRepository;
  private recipeStepsRepository;

  constructor() {
    this.recipeRepository = AppDataSource.getRepository(Recipe);
    this.recipeIngredientRepository = AppDataSource.getRepository(RecipeIngredient);
    this.recipeStepsRepository = AppDataSource.getRepository(RecipeSteps);
  }

  create = async (req: Request, res: Response) => {
    try {
      console.log(req.body);
      const body = req.body;

      // Salva a receita
      const recipe = await this.recipeRepository.save(body);

      // Verifica se existem ingredientes e salva-os
      if (body.ingredients && Array.isArray(body.ingredients)) {
        body.ingredients.forEach(async (ingredient: { name: string }) => {
          await this.recipeIngredientRepository.save({
            ...ingredient,
            recipe_id: recipe.id,
          });
        });
      }

      // Verifica se existem etapas e salva-as
      if (body.steps && Array.isArray(body.steps)) {
        body.steps.forEach(async (step: { description: string }) => {
          await this.recipeStepsRepository.save({
            ...step,
            recipe_id: recipe.id,
          });
        });
      }

      res.status(201).json(recipe);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  getAll = async (req: Request, res: Response) => {
    try {
      const recipes = await this.recipeRepository.find({ relations: ["ingredients", "steps"] });
      res.json(recipes);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  };
}

export default RecipeController;
