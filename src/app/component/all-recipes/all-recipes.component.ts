import { Component, Input, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { RecipeServiceService } from '../../shared/Service/Recipe/recipe-service.service';
import { CommonModule, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OneRecipesComponent } from '../one-recipes/one-recipes.component';

@Component({
  selector: 'app-all-recipes',
  standalone: true,
  imports: [MatTabsModule,CommonModule,RouterModule,OneRecipesComponent,NgIf],
  templateUrl: './all-recipes.component.html',
  styleUrl: './all-recipes.component.scss'
})
export class AllRecipesComponent implements OnInit{
  recipes: any[] = [];
  showModal: boolean = false;
  selectedRecipe: any = null;

  constructor(private recipeService: RecipeServiceService) { }

  openRecipeModal(recipe: any) {
    this.selectedRecipe = recipe;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedRecipe = null;
  }

  ngOnInit(): void {
    // קריאה לשירות על מנת לקבל את רשימת המתכונים
    this.recipeService.getRecipes().subscribe((data: any) => {
      this.recipes = data;
      console.log(this.recipes);
      
    });


   
  }
}
