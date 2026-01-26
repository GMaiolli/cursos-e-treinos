import { Component, input } from '@angular/core';
import { Usuario } from './usuario';
import { CommonModule } from '@angular/common';
import { BotaoPadronizadoComponent } from '../botao-padronizado/botao-padronizado.component';

@Component({
  selector: 'app-usuario',
  imports: [CommonModule, BotaoPadronizadoComponent],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css',
})
export class UsuarioComponent {

  usuario = input.required<Usuario>();



}
