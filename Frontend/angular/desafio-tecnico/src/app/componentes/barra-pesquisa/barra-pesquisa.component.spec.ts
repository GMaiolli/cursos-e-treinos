import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarraPesquisaComponent } from './barra-pesquisa.component';
import { FormsModule } from '@angular/forms';

describe('BarraPesquisaComponent', () => {
  let component: BarraPesquisaComponent;
  let fixture: ComponentFixture<BarraPesquisaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BarraPesquisaComponent,
        FormsModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarraPesquisaComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
