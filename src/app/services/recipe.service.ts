import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Recipe } from '../models/Recipe';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipes$ = new BehaviorSubject<Recipe[]>([]);

  constructor(private http: HttpClient) {}

  getRecipes() {
    this.http.get('https://vicjuma.herokuapp.com/api/recipes').subscribe(
      (recipes: Recipe[]) => {
        this.recipes$.next(recipes);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getSingleRecipe(id: string) {
    return this.http.get('https://vicjuma.herokuapp.com/api/recipes/' + id);
  }

  saveRecipe(recipe: Recipe) {
    return this.http.post('https://vicjuma.herokuapp.com/api/recipes', recipe);
  }

  modifyRecipe(id: string, recipe: Recipe) {
    return this.http.put('https://vicjuma.herokuapp.com/api/recipes/' + id, recipe);
  }

  deleteRecipe(id: string) {
    return this.http.delete('https://vicjuma.herokuapp.com/api/recipes/' + id);
  }
}
