import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { SlideshowComponent } from '../slideshow/slideshow.component';

@Component({
  selector: 'app-one-recipes',
  standalone: true,
  imports: [CommonModule, SlideshowComponent],
  templateUrl: './one-recipes.component.html',
  styleUrl: './one-recipes.component.scss'
})
export class OneRecipesComponent {
  @Input() recipe: any;

  constructor() { }

  getImageUrls(): string[] {
    return this.recipe.image.map((img: string) => 'http://localhost:5000/images/' + img);
  }

  ccc() {
    console.log(this.recipe);
  }

}
