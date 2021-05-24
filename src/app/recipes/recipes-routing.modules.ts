import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';

const routes: Routes = [
     { path: 'recipes', component: RecipesComponent, canActivate: [AuthGuard], children: [
     { path: '', component: RecipeStartComponent },
     { path: 'new', component: RecipeEditComponent },
     { path: ':id', component: RecipeDetailComponent, resolve: [RecipesResolverService] },
     { path: ':id/edit', component: RecipeEditComponent, resolve: [RecipesResolverService] }
  ]},
];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})

export class RecipesRoutingModule {}