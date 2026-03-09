import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarUsuarioComponent } from './editar-usuario.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CabecalhoComponent } from '../../componentes/cabecalho/cabecalho.component';
import { FormularioUsuarioComponent } from '../../componentes/formulario-usuario/formulario-usuario.component';
import { provideRouter, Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { of } from 'rxjs';

describe('EditarUsuarioComponent', () => {
  let component: EditarUsuarioComponent;
  let fixture: ComponentFixture<EditarUsuarioComponent>;
  let service: UsuarioService;
  

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarUsuarioComponent, FormularioUsuarioComponent, CabecalhoComponent, MatButtonModule, MatIconModule, MatTooltipModule],
      providers: [provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarUsuarioComponent);
    service = TestBed.inject(UsuarioService)
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('deve emitir a edição de um usuário pelo método editarUsuario', ()=>{
      const usuarioExemplo = {
        id: '423423',
        nome: 'nome',
        email: 'email@example.com'
      };

      const router = TestBed.inject(Router)

      const editarServiceSpy = vi.spyOn(service, 'editarUsuario').mockReturnValue(of(usuarioExemplo)); //evita que chame lá na API e faça esse tratamento
      const routerSpy = vi.spyOn(router, 'navigate')

      component.editarUsuario(usuarioExemplo);

      expect(editarServiceSpy).toHaveBeenCalledWith(usuarioExemplo);
      expect(routerSpy).toHaveBeenCalledWith(['/inicio'])

    });

});
