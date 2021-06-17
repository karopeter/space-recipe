import { ShoppingListState, shoppingListReducer}  from './shopping-list/store/shopping-list.reducer';
import { ActionReducerMap } from '@ngrx/store';
import * as fromAuth from './auth/store/auth.reducer';
import { RecipeState, recipeReducer } from './recipes/store/recipe.reducer';

export const rootReducer = {};

export interface AppState {
  shoppingList: ShoppingListState;
  recipes: RecipeState;
  auth: fromAuth.State;
}

export const reducers: ActionReducerMap<AppState, any> = {
  shoppingList: shoppingListReducer,
  recipes: recipeReducer,
  auth: fromAuth.authReducer
};


