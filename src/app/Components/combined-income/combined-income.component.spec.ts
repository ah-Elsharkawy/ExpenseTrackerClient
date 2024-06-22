import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CombinedIncomeComponent } from './combined-income.component';

describe('CombinedIncomeComponent', () => {
  let component: CombinedIncomeComponent;
  let fixture: ComponentFixture<CombinedIncomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CombinedIncomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CombinedIncomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
