import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RecipeService } from "../recipes/recipe.service";
import { baseUrl } from "src/endpoint";
import { Recipe } from "../recipes/recipe.model";
import { map, tap } from "rxjs";

@Injectable({ providedIn: "root" })
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.put(baseUrl + "/recipes.json", recipes).subscribe(console.log);
  }

  fetchRecipes() {
    return this.http.get<Recipe[]>(baseUrl + "/recipes.json").pipe(
      map((data) =>
        data.map((recipe) => ({
          ...recipe,
          ingredients: recipe.ingredients || [],
        }))
      ),
      tap((recipes) => this.recipeService.setRecipes(recipes))
    );
  }
}
