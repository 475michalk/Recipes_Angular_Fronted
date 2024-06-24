import { Component, OnInit } from '@angular/core';
import { RecipeServiceService } from '../../shared/Service/Recipe/recipe-service.service';
import { CategoryServiceService } from '../../shared/Service/Category/category-service.service';
import { CommonModule, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OneRecipesComponent } from '../one-recipes/one-recipes.component';
import { SlideshowComponent } from '../slideshow/slideshow.component';
import { TimePipe } from '../../shared/pipe/time.pipe';
import { Recipe } from '../../shared/models/recipes';
import { StarsDirective } from '../../directive/stars.directive';

@Component({
  selector: 'app-all-recipes',
  standalone: true,
  imports: [CommonModule, RouterModule, OneRecipesComponent, NgIf, SlideshowComponent, StarsDirective, TimePipe],
  templateUrl: './all-recipes.component.html',
  styleUrls: ['./all-recipes.component.scss']
})
export class AllRecipesComponent implements OnInit {
  recipes: Recipe[] = [];
  filteredRecipes: Recipe[] = [];
  categories: string[] = [];
  showModal: boolean = false;
  selectedRecipe: Recipe | null = null;

  // Pagination
  pageSize: number = 5; // Default page size
  currentPage: number = 1;
  totalRecipes: number = 0;

  // Filters
  nameFilter: string = '';
  categoryFilter: string = '';
  preparationTimeFilter: number | null = null;

  constructor(
    private recipeService: RecipeServiceService,
    private categoryService: CategoryServiceService
  ) {}

  ngOnInit(): void {
    this.fetchRecipes();
    this.fetchCategories();
  }

  fetchRecipes(): void {
    const page = this.currentPage;
    const pageSize = this.pageSize;
    this.recipeService.getRecipes(page, pageSize).subscribe((response: any) => {
      console.log('Response from server:', response); // הדפסת התשובה מהשרת
      this.recipes = response.recipes;
      this.totalRecipes = response.total;
      this.applyFilters();
    });
  }

  fetchCategories(): void {
    this.categoryService.getCategories().subscribe((data: any[]) => {
      this.categories = data.map(category => category.name); // Extract the names
    });
  }

  applyFilters(): void {
    this.filteredRecipes = this.recipes.filter(recipe => {
      const nameMatches = !this.nameFilter || (recipe.nameRecipe && recipe.nameRecipe.toLowerCase().includes(this.nameFilter.toLowerCase()));
      const categoryMatches = !this.categoryFilter || recipe.categoryName.includes(this.categoryFilter);
      const preparationTimeMatches = this.preparationTimeFilter === null || (recipe.preparationTime && recipe.preparationTime <= this.preparationTimeFilter);

      return nameMatches && categoryMatches && preparationTimeMatches;
    });
    this.updateFilteredRecipes();
  }

  updateFilteredRecipes(): void {
    console.log('Filtered Recipes:', this.filteredRecipes); // הדפסת המתכונים המסוננים
  }

  loadNextPage(): void {
    if (this.currentPage * this.pageSize < this.totalRecipes) {
      this.currentPage++;
      this.fetchRecipes();
    }
  }

  loadPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.fetchRecipes();
    }
  }

  getImageUrls(recipe: Recipe): string[] {
    return recipe.image.map((img: string) => 'http://localhost:5000/images/' + img);
  }

  changePageSize(event: Event): void {
    const size = parseInt((event.target as HTMLSelectElement).value, 10);
    this.pageSize = size;
    this.currentPage = 1;
    this.fetchRecipes();
  }

  openRecipeModal(recipe: Recipe): void {
    this.selectedRecipe = recipe;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedRecipe = null;
  }

  // Filter handlers
  onNameFilterChange(event: Event): void {
    this.nameFilter = (event.target as HTMLInputElement).value;
    this.applyFilters();
  }

  onCategoryFilterChange(event: Event): void {
    this.categoryFilter = (event.target as HTMLSelectElement).value;
    this.applyFilters();
  }

  onPreparationTimeFilterChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.preparationTimeFilter = value ? parseInt(value, 10) : null;
    this.applyFilters();
  }
}
