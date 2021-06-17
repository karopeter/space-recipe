import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {Recipe } from './recipe.model';
import { DataStorageService } from './../shared/data-storage.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../app.reducer';
import { RecipeService } from './recipe.service';
import { Actions, ofType } from '@ngrx/effects';
import * as RecipesActions from './store/recipe.actions';
import { take, map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class RecipesResolverService implements Resolve<Recipe[]> {
     constructor(private dataStorageService: DataStorageService, private actions$: Actions, private store: Store<fromApp.AppState>, private recipeService: RecipeService) {}

     resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
       this.store.select('recipes').pipe(map(recipesState => {
         return recipesState.recipes;
       }));
       const recipes = this.recipeService.getRecipes();
       if (recipes.length === 0) {
        return this.dataStorageService.fetchRecipes();
        this.store.dispatch(new RecipesActions.FetchRecipes());
        this.actions$.pipe(ofType(RecipesActions.SET_RECIPES), take(1));
       } else {
         return recipes;
       }
     }
}
