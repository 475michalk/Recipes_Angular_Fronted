import { Component, OnInit } from '@angular/core';
import { RecipeServiceService } from '../../shared/Service/Recipe/recipe-service.service';
import { CategoryServiceService } from '../../shared/Service/Category/category-service.service'; // Import the CategoryService
import { CommonModule, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OneRecipesComponent } from '../one-recipes/one-recipes.component';
import { SlideshowComponent } from '../slideshow/slideshow.component';
import { StarsDirective } from '../../shared/directive/stars.directive';
import { TimePipe } from '../../shared/pipe/time.pipe';
import { Recipe } from '../../shared/models/recipes';

@Component({
  selector: 'app-all-recipes',
  standalone: true,
  imports: [CommonModule, RouterModule, OneRecipesComponent, NgIf, SlideshowComponent, StarsDirective, TimePipe],
  templateUrl: './all-recipes.component.html',
  styleUrls: ['./all-recipes.component.scss']
})
export class AllRecipesComponent implements OnInit {
  recipes: any[] = [];
  filteredRecipes: any[] = [];
  categories: string[] = [];
  showModal: boolean = false;
  selectedRecipe: any = null;

  // Pagination
  pageSize: number = 5; // Default page size
  currentPage: number = 1;

  // Filters
  nameFilter: string = '';
  categoryFilter: string = '';
  preparationTimeFilter: number | null = null;

  constructor(
    private recipeService: RecipeServiceService,
    private categoryService: CategoryServiceService // Inject the CategoryService
  ) {}

  ngOnInit(): void {
    this.fetchRecipes();
    this.fetchCategories();
  }

  fetchRecipes(): void {
    this.recipeService.getMyRecipes('123').subscribe((data: any) => {
      this.recipes = data;
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
      return (
        (!this.nameFilter || recipe.nameRecipe.toLowerCase().includes(this.nameFilter.toLowerCase())) &&
        (!this.categoryFilter || recipe.categoryName.includes(this.categoryFilter)) &&
        (this.preparationTimeFilter === null || recipe.preparationTime <= this.preparationTimeFilter)
      );
    });
    this.updateFilteredRecipes();
  }

  updateFilteredRecipes(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.filteredRecipes = this.filteredRecipes.slice(startIndex, startIndex + this.pageSize);
  }

  loadNextPage(): void {
    this.currentPage++;
    this.fetchRecipes();
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

  openRecipeModal(recipe: any): void {
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
