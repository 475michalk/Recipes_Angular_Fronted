import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-slideshow',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './slideshow.component.html',
  styleUrl: './slideshow.component.scss'
})
export class SlideshowComponent {
  @Input() previewImages: string[] = [];
  currentIndex: number = 0;
  private intervalId: any;

  ngOnInit(): void {
    this.startAutoSlide();
  }

  ngOnDestroy(): void {
    this.clearAutoSlide();
  }

  plusSlides(n: number): void {
    this.currentIndex = (this.currentIndex + n + this.previewImages.length) % this.previewImages.length;
  }

  currentSlide(index: number): void {
    this.currentIndex = index;
  }

  private startAutoSlide(): void {
    this.intervalId = setInterval(() => {
      this.plusSlides(1);
    }, 3000); // Change slide every 3 seconds
  }

  private clearAutoSlide(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
