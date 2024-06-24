import { Component, OnInit } from '@angular/core';
import { RecipeServiceService } from '../../shared/Service/Recipe/recipe-service.service';
import { Recipe } from '../../shared/models/recipes';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { SlideshowComponent } from '../slideshow/slideshow.component';
import { OneRecipesComponent } from '../one-recipes/one-recipes.component';
import { TimePipe } from '../../shared/pipe/time.pipe';
import { StarsDirective } from '../../directive/stars.directive';

@Component({
  selector: 'app-my-recipe',
  standalone: true,
  imports: [CommonModule, RouterModule, OneRecipesComponent, NgIf, SlideshowComponent, StarsDirective, TimePipe, NgFor],
  templateUrl: './my-recipe.component.html',
  styleUrl: './my-recipe.component.scss'
})
export class MyRecipeComponent implements OnInit {
  recipes: Recipe[] = [];
  showModal: boolean = false;
  selectedRecipe: Recipe | null = null;

  constructor(private recipeService: RecipeServiceService, private router: Router) { }

  openRecipeModal(recipe: Recipe) {
    this.selectedRecipe = recipe;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedRecipe = null;
  }

  editRecipe(recipe: Recipe) {
    // נווט לדף העריכה עם ID של המתכון
    //this.router.navigate(['/edit-recipe', recipe._id]);
  }

  ngOnInit(): void {
    const userId = '665ddc3216875d40962dc143'; // השיגי את ה-ID של המשתמש הנוכחי בדרך כלשהי, לדוגמה מה-AuthService שלך
    this.recipeService.getMyRecipes(userId).subscribe((data: Recipe[]) => {
      this.recipes = data;
      console.log(this.recipes);
    });
  }

  getImageUrls(recipe: Recipe): string[] {
    return recipe.image.map((img: string) => 'http://localhost:5000/images/' + img);
  }
}
