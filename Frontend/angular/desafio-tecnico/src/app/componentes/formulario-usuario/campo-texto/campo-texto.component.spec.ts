import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampoTextoComponent } from './campo-texto.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

describe('CampoTextoComponent', () => {
  let component: CampoTextoComponent;
  let fixture: ComponentFixture<CampoTextoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CampoTextoComponent, ReactiveFormsModule, CommonModule, FormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampoTextoComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
