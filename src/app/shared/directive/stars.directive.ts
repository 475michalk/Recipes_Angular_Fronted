import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appStars]',
  standalone: true
})
export class StarsDirective {

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) { }

  @Input() set appStars(difficulty: number) {
    this.viewContainer.clear();
    for (let i = 0; i < difficulty; i++) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }
}
