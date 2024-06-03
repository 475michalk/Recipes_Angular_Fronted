import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneRecipesComponent } from './one-recipes.component';

describe('OneRecipesComponent', () => {
  let component: OneRecipesComponent;
  let fixture: ComponentFixture<OneRecipesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OneRecipesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OneRecipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
