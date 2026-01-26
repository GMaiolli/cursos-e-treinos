import { Component, input } from '@angular/core';
import { Usuario } from './usuario';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-usuario',
  imports: [CommonModule],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css',
})
export class UsuarioComponent {

  usuario = input.required<Usuario>();



}
