import { Actions, Effect, ofType } from '@ngrx/effects';
import * as RecipesActions from './recipe.actions';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';
import { Recipe } from '../recipe.model';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import * as fromApp from '../../app.reducer';
import { Injectable } from '@angular/core';

@Injectable()
export class RecipeEffects {
  @Effect()
  fetchRecipes = this.actions$.pipe(ofType(RecipesActions.FETCH_RECIPES),
  switchMap(() => {
    return this.http.get<Recipe[]>('https://space-recipe-default-rtdb.firebaseio.com/recipes.json');
  }), map(recipes => {
    return recipes.map(recipe => {
      return {
        ...recipe,
        ingredients: recipe.ingredients ? recipe.ingredients : []
      };
    });
  }), map(recipes => {
    return new RecipesActions.SetRecipes(recipes);
  }));

  @Effect({ dispatch: false})
  storeRecipes = this.actions$.pipe(ofType(RecipesActions.STORE_RECIPES), withLatestFrom(this.store.select('recipes')), switchMap(([actionData, recipesState]) => {
    return this.http.put('https://space-recipe-default-rtdb.firebaseio.com/recipes.json', recipesState.recipes);
  }));

  constructor(private actions$: Actions, private http: HttpClient, private store: Store<fromApp.AppState>) {}
}

