import { Action } from '@ngrx/store';
import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.action';

export interface ShoppingListState{
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}

export interface AppState {
  shoppingList: State;
}

export interface State  {
  isAuthenticated: boolean;
}

const initialState: ShoppingListState = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ],
  editedIngredient: null as any,
  editedIngredientIndex: -1
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
     case ShoppingListActions.UPDATE_INGREDIENT:
       const ingredient = state.ingredients[action.payload.index];
       const updatedIngredient = {
         ...ingredient,
         ...action.payload.ingredient
       };
       const updatedIngredients = [...state.ingredients];
       updatedIngredients[action.payload.index] = updatedIngredient;
       return {
         ...state,
         ingredients: updatedIngredients
       };
      case ShoppingListActions.DELETE_INGREDIENT:
        return {
         ...state,
         ingredients: state.ingredients.filter((ig, igIndex) => {
           return igIndex !== action.payload;
         })
        };
    default: {
      return state;
    }
   }
}
