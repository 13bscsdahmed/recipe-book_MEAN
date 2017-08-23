import { Injectable, EventEmitter } from '@angular/core';
import {Recipe} from "./recipe"
import {Ingredient} from "./ingredient";
import {Headers, Http} from '@angular/http';
import {Response} from '@angular/http';

import 'rxjs/Rx' ;
import {Observable} from "rxjs/Rx";


@Injectable()
export class RecipeService {
  recipesChanged= new EventEmitter <Recipe[]> () ;
  private recipes: Recipe[ ]= [];
    /*new Recipe('Dummy','Dummy','http://windelversand.ch/c/26-category_default/dummy-small-cherry.jpg',
    [new Ingredient('French Fries',2),
    new Ingredient('Meat',1)
    ]),
    new Recipe('Azfar','Usman','http://worldartsme.com/images/small-pencil-clipart-1.jpg',[
      new Ingredient('Potato',3),
        new Ingredient('Milk',4)
      ] ) ,
    new Recipe('Malik','Usman','https://thumbs.dreamstime.com/t/small-pencil-drew-lot-drawings-47782480.jpg',[ ] )
  ]; */

  constructor(private http: Http) { }

  getRecipes() {
    return this.http.get('http://localhost:3000/recipe')
      .map((response: Response) => {



        const recipes = response.json().obj;
        const transformedRecipes: Recipe[] = [];
        for (const recipe of recipes){
          transformedRecipes.push(new Recipe
          (recipe._id,
            recipe.name,
            recipe.description,
            recipe.imagePath,
            recipe.ingredients));
        }

          this.recipes = transformedRecipes;
          return this.recipes ;
      })
      .catch((error: Response) => {
        return Observable.throw(error.json);
      });




  }

  getRecipe(id: number){
    return this.recipes[id];

  }

  deleteRecipe(recipe: Recipe) {

    this.recipes.splice(this.recipes.indexOf(recipe), 1 );

    return this.http.delete('http://localhost:3000/recipe/' + recipe.RecipeId)
      .map((response: Response) => response.json())
      .catch((error: Response) => {
        return Observable.throw(error.json());
      });
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    const body = JSON.stringify(recipe);
    const headers = new Headers({'Content-Type': 'application/json' });
    return this.http.post('http://localhost:3000/recipe', body, {headers: headers})


      .map((response: Response) => response.json())   //returning observable
       //.map tranforms response into a recognizable form. In this case to json and throws away redundant header fields etc and returns an observable
      .catch((error: Response) => {
        return Observable.throw(error.json());
      });

  }

  editRecipe(oldRecipe: Recipe, newRecipe: Recipe) {
    this.recipes[this.recipes.indexOf(oldRecipe)] = newRecipe;
    newRecipe.RecipeId = oldRecipe.RecipeId;
    const body = JSON.stringify(newRecipe);
    const headers = new Headers({'Content-Type': 'application/json' });

    return this.http.patch('http://localhost:3000/recipe/' + oldRecipe.RecipeId, body, {headers: headers})


      .map((response: Response) => response.json())


      .catch((error: Response) => {
        return Observable.throw(error.json());
      });

  }


  storeData() {
    const body = JSON.stringify(this.recipes);
    const headers = new Headers({
        'Content-Type': 'application/json'
      });
    return this.http.put('https://recipebook-2b18f.firebaseio.com/recipes.json', body, {headers: headers});
  }

  fetchData() {
    return this.http.get('https://recipebook-2b18f.firebaseio.com/recipes.json')
      .map((response: Response) => response.json())
      .subscribe(
        (data: Recipe[]) => {
          this.recipes = data;
          this.recipesChanged.emit(this.recipes);
        }
      );

  }

}
