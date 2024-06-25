import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { SlideshowComponent } from '../slideshow/slideshow.component';
import { RecipeServiceService } from '../../shared/Service/Recipe/recipe-service.service';
import { UserServiceService } from '../../shared/Service/Users/user-service.service';
import { StarsDirective } from '../../directive/stars.directive';
import { TimePipe } from '../../pipe/time.pipe';

@Component({
  selector: 'app-one-recipes',
  standalone: true,
  imports: [CommonModule, SlideshowComponent,TimePipe,StarsDirective],
  templateUrl: './one-recipes.component.html',
  styleUrl: './one-recipes.component.scss'
})
export class OneRecipesComponent {
  @Input() recipe: any;

  isOwner: boolean = false;
  showDeleteModal: boolean = false;

  constructor(
    private userService: UserServiceService,
    private recipeService: RecipeServiceService
  ) {}

  ngOnInit(): void {
    this.checkOwnership();
  }

  checkOwnership(): void {
    const token = this.userService.token;
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      this.isOwner = this.recipe.ownerId === payload.userId;
    }
  }

  getImageUrls(): string[] {
    return this.recipe.image.map((img: string) => 'http://localhost:5000/images/' + img);
  }

  openDeleteModal(): void {
    this.showDeleteModal = true;
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false;
  }

  deleteRecipe(): void {
    this.recipeService.deleteRecipe(this.recipe._id).subscribe(
      () => {
        console.log('Recipe deleted successfully!');
        this.closeDeleteModal();
        location.reload(); // Refresh the page
      },
      (error) => {
        console.error('Error deleting recipe:', error);
      }
    );
  }
}