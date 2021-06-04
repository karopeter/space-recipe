import { ShoppingListState, shoppingListReducer}  from './shopping-list/store/shopping-list.reducer';
import { ActionReducerMap } from '@ngrx/store';
import * as fromAuth from './auth/store/auth.reducer';

export const rootReducer = {};

export interface AppState {
  shoppingList: ShoppingListState;
  auth: fromAuth.State;
}

export const reducers: ActionReducerMap<AppState, any> = {
  shoppingList: shoppingListReducer,
  auth: fromAuth.authReducer
};


