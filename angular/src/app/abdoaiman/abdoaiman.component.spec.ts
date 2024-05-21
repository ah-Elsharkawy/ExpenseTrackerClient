import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbdoaimanComponent } from './abdoaiman.component';

describe('AbdoaimanComponent', () => {
  let component: AbdoaimanComponent;
  let fixture: ComponentFixture<AbdoaimanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AbdoaimanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AbdoaimanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
