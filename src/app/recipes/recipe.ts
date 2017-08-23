import {Ingredient} from "./ingredient";

export class Recipe {
  constructor(public RecipeId: String, public name: string, public description: string, public imagePath: string, public ingredients: Ingredient[]) {

  }
}
