import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataStorageService } from './../shared/data-storage.service';
import { AuthService } from './../auth/auth.service';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromApp from '../app.reducer';
import * as AuthActions from './../auth/store/auth.actions';
import * as RecipesActions from './../recipes/store/recipe.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private userSub!: Subscription;
  constructor(private dataStorageService: DataStorageService, private authService: AuthService, private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.userSub = this.store.select('auth').pipe(map(authState => authState.user)).subscribe(user => {
      this.isAuthenticated = !!user;
      console.log(!user);
    });
  }

  onSaveData(): void {
     this.dataStorageService.storeRecipes();
     this.store.dispatch(new RecipesActions.StoreRecipes());
  }

  onFetchData(): void {
    this.dataStorageService.fetchRecipes().subscribe();
    this.store.dispatch(new RecipesActions.FetchRecipes());
  }

  onLogout(): void {
    // this.authService.logout();
    this.store.dispatch(new AuthActions.Logout());
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
