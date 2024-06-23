import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { environment } from '../../../environments/environment';
import { RecipeServiceService } from '../../shared/Service/Recipe/recipe-service.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatButtonModule,RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  imageUrl?: string;

  constructor(private imageService: RecipeServiceService) {}

  ngOnInit() {
    setInterval(() => {
      this.imageService.getNextImage().subscribe(
        (data: any) => {
          this.imageUrl = data.imageUrl;
        },
        (error: any) => {
          console.error('Error fetching image:', error);
        }
      );
    }, 3000);
  }
}

