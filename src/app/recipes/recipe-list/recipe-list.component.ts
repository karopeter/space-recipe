import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from './../recipe.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromApp from '../../app.reducer';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes!: Recipe[];
  subscription!: Subscription;

  constructor(private recipeService: RecipeService, private router: Router, private route: ActivatedRoute, private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.subscription = this.store.select('recipes').pipe(map(recipesState => recipesState.recipes)).subscribe((recipes: Recipe[]) => {
      this.recipes = recipes;
    });
    this.recipes = this.recipeService.getRecipes();
  }

  onNewRecipe(): void {
      this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
