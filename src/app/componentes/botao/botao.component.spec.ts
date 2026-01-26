import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotaoComponent } from './botao.component';

describe('BotaoComponent', () => {
  let component: BotaoComponent;
  let fixture: ComponentFixture<BotaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BotaoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BotaoComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
