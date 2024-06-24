import { Component } from '@angular/core';
import { Recipe } from '../../shared/models/recipes';
import { RecipeServiceService } from '../../shared/Service/Recipe/recipe-service.service';
import { RouterModule } from '@angular/router';
import { FormsModule, NgModel } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { CategoryServiceService } from '../../shared/Service/Category/category-service.service';

@Component({
  selector: 'app-add-recipe',
  standalone: true,
  imports: [RouterModule, FormsModule, NgFor, NgIf],
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.scss'],
})
export class AddRecipeComponent {
  newRecipe: Recipe = new Recipe();
  categories: string[] = [];
  selectedCategories: string[] = [];
  newCategoryName: string = '';
  categoryNameInput: string = '';
  files: FileList | undefined;
  ingredientInput: string = '';

  constructor(
    private recipeService: RecipeServiceService,
    private categoryService: CategoryServiceService
  ) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe(
      (data: any[]) => {
        this.categories = data.map(category => category.name); // Assuming data contains objects with a name property
      },
      (error) => {
        console.error('Error loading categories:', error);
      }
    );
  }

  addIngredient(layerIndex: number, event: any): void {
    event.preventDefault(); // Prevent form submission
    if (this.ingredientInput.trim() !== '') {
      if (!this.newRecipe.layers[layerIndex]) {
        this.newRecipe.layers[layerIndex] = { description: '', component: [] };
      }
      this.newRecipe.layers[layerIndex].component.push(this.ingredientInput.trim());
      this.ingredientInput = ''; // Clear input field after adding ingredient
    }
  }

  addLayer(): void {
    this.newRecipe.layers.push({ description: '', component: [] });
  }

  addSelectedCategories(): void {
    if (this.categoryNameInput === 'new' && this.newCategoryName.trim() !== '') {
      this.categoryService.addCategory(this.newCategoryName.trim()).subscribe(
        (newCategory) => {
          this.newRecipe.categoryName.push(newCategory.name);
        },
        (error) => {
          console.error('Error adding category:', error);
        }
      );
    } else {
      this.newRecipe.categoryName.push(...this.selectedCategories);
    }
  }

  onSubmit(): void {
    this.addSelectedCategories();
    this.saveRecipe();
  }

  saveRecipe(): void {
    this.recipeService.addRecipe(this.newRecipe, this.files).subscribe(
      () => {
        console.log('Recipe added successfully!');
        this.categoryNameInput = '';
        this.newCategoryName = ''; // Clear new category input after submission
      },
      (error) => {
        console.error('Error adding recipe:', error);
      }
    );
  }

  onFileSelected(event: any): void {
    this.files = event.target.files;
  }

  handleCategoryChange(event: any): void {
    const selectedCategory = event.target.value;
    if (selectedCategory === 'new') {
      this.categoryNameInput = 'new';
    } else {
      this.selectedCategories.push(selectedCategory);
    }
  }
}