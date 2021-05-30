import { ShoppingListState, shoppingListReducer}  from './shopping-list/store/shopping-list.reducer';
import { ActionReducerMap } from '@ngrx/store';

export const rootReducer = {};

export interface State {
  shoppingList: ShoppingListState;
}

export const reducers: ActionReducerMap<State, any> = {
  shoppingList: shoppingListReducer
};


