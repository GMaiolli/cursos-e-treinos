import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriacaoComponent } from './criacao.component';
import { FormularioUsuarioComponent } from '../../componentes/formulario-usuario/formulario-usuario.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CabecalhoComponent } from '../../componentes/cabecalho/cabecalho.component';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

describe('CriacaoComponent', () => {
  let component: CriacaoComponent;
  let fixture: ComponentFixture<CriacaoComponent>;
  let service: UsuarioService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CriacaoComponent, CabecalhoComponent, MatIconModule, MatButtonModule, MatTooltipModule, FormularioUsuarioComponent, RouterTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CriacaoComponent);
    service = TestBed.inject(UsuarioService)
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve fazer a criação de um usuário pelo método adicionarUsuario', ()=>{
      const usuarioExemplo = {
        id: '423423',
        nome: 'nome',
        email: 'email@example.com'
      };

      const router = TestBed.inject(Router)

      const adicionarServiceSpy = vi.spyOn(service, 'adicionarUsuario').mockReturnValue(of(usuarioExemplo)); //evita que chame lá na API e faça esse tratamento
      const routerSpy = vi.spyOn(router, 'navigate')

      component.criarUsuario(usuarioExemplo);

      expect(adicionarServiceSpy).toHaveBeenCalledWith(usuarioExemplo);
      expect(routerSpy).toHaveBeenCalledWith(['/inicio'])

    });

  
});
