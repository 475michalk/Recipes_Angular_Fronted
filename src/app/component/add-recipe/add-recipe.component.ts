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
  showNewCategoryInput: boolean = false;

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

    addNewCategory(): void {
    this.showNewCategoryInput = true; // Show the input field for new category
  }

  confirmNewCategory(): void {
    if (this.newCategoryName.trim() !== '') {
      this.categoryService.addCategory(this.newCategoryName.trim()).subscribe(
        (newCategory) => {
          this.selectedCategories.push(newCategory.name);
          this.newRecipe.categoryName.push(newCategory.name);
          this.newCategoryName = ''; // Clear newCategoryName after adding new category
          this.showNewCategoryInput = false; // Hide the input field after confirmation
        },
        (error) => {
          console.error('Error adding category:', error);
        }
      );
    }
  }

  onSubmit(): void {
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
    this.categoryNameInput = selectedCategory;
    if (!this.selectedCategories.includes(selectedCategory)) {
      this.selectedCategories.push(selectedCategory);
    }
    if (!this.newRecipe.categoryName.includes(selectedCategory)) {
      this.newRecipe.categoryName.push(selectedCategory);
    }
  }

}