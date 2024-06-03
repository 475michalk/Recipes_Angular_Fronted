import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-one-recipes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './one-recipes.component.html',
  styleUrl: './one-recipes.component.scss'
})
export class OneRecipesComponent {
  @Input() recipe: any;

  constructor() { }

}
