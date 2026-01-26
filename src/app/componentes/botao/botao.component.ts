import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-botao',
  imports: [],
  templateUrl: './botao.component.html',
  styleUrl: './botao.component.css',
})
export class BotaoComponent {

  constructor(private router: Router) {}

  aoClicar(){
    this.router.navigate(["/criacao"])  
  }
}
