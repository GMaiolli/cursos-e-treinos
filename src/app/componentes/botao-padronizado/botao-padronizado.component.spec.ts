import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotaoPadronizadoComponent } from './botao-padronizado.component';

describe('BotaoPadronizadoComponent', () => {
  let component: BotaoPadronizadoComponent;
  let fixture: ComponentFixture<BotaoPadronizadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BotaoPadronizadoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BotaoPadronizadoComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
