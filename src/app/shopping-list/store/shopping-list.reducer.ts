import { Action } from '@ngrx/store';
import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.action';

export interface ShoppingListState{
  ingredients: Ingredient[];
}

export interface State  {
  isAuthenticated: boolean;
}

const initialState = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ]
};

export function shoppingListReducer(state: ShoppingListState = initialState, action: ShoppingListActions.ShoppingListActions) {
   switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
    return {
      ...state,
      ingredients: [...state.ingredients, action.payload]
    };
    case ShoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload]
      };
    default: {
      return state;
    }
   }
}
