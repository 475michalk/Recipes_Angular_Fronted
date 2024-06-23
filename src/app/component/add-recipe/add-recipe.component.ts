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
  imports: [RouterModule, FormsModule, NgFor,NgIf],
  templateUrl: './add-recipe.component.html',
  styleUrl: './add-recipe.component.scss',
})
export class AddRecipeComponent {
  newRecipe: Recipe = new Recipe();
  categoryNameInput: string = '';
  files: FileList | undefined;
  categories: any[] = []; // List of existing categories
  newCategory: boolean = false; // To track if user selects "new category"
  selectedCategory: string = ''; // Track selected category

  constructor(
    private recipeService: RecipeServiceService,
    private categoryService: CategoryServiceService // Assuming you have a category service
  ) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe(
      (data: any[]) => {
        this.categories = data;
      },
      (error) => {
        console.error('Error loading categories:', error);
      }
    );
  }
  onSubmit(): void {
    if (this.newCategory && this.categoryNameInput.trim() !== '') {
      this.categoryService.addCategory(this.categoryNameInput.trim()).subscribe(
        (newCategory) => {
          this.newRecipe.categoryName.push(newCategory.name);
          this.saveRecipe();
        },
        (error) => {
          console.error('Error adding category:', error);
        }
      );
    } else if (this.selectedCategory !== '' && !this.newCategory) {
      if (!this.newRecipe.categoryName.includes(this.selectedCategory)) {
        this.newRecipe.categoryName.push(this.selectedCategory);
      }
      this.saveRecipe();
    }
  }

  saveRecipe(): void {
    this.recipeService.addRecipe(this.newRecipe, this.files).subscribe(
      () => {
        console.log('Recipe added successfully!');
        this.newRecipe = new Recipe();
        this.categoryNameInput = '';
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
    this.selectedCategory = event.target.value;
    if (this.selectedCategory === 'new') {
      this.newCategory = true;
      this.categoryNameInput = '';
    } else {
      this.newCategory = false;
      this.categoryNameInput = this.selectedCategory;
    }
  }
}