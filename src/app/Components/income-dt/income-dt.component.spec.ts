import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeDTComponent } from './income-dt.component';

describe('IncomeDTComponent', () => {
  let component: IncomeDTComponent;
  let fixture: ComponentFixture<IncomeDTComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncomeDTComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IncomeDTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
