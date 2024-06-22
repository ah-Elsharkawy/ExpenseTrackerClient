import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CombinedExpenseComponent } from './combined-expense.component';

describe('CombinedExpenseComponent', () => {
  let component: CombinedExpenseComponent;
  let fixture: ComponentFixture<CombinedExpenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CombinedExpenseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CombinedExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
