import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FahmyComponent } from './fahmy.component';

describe('FahmyComponent', () => {
  let component: FahmyComponent;
  let fixture: ComponentFixture<FahmyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FahmyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FahmyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
