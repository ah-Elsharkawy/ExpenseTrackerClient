import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseDTComponent } from './expense-dt.component';

describe('ExpenseDTComponent', () => {
  let component: ExpenseDTComponent;
  let fixture: ComponentFixture<ExpenseDTComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpenseDTComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExpenseDTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
