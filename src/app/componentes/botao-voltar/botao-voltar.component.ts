import { Component, input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-botao-voltar',
  imports: [],
  templateUrl: './botao-voltar.component.html',
  styleUrl: './botao-voltar.component.css',
})
export class BotaoVoltarComponent {

  rota = input.required<string>();

  // endpoint = "/" + this.rota(); 

  constructor(private router: Router) {}

  aoClicar(){
    this.router.navigate([this.rota()])  
  }
}
