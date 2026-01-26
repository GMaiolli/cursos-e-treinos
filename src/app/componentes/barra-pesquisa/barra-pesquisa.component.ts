import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-barra-pesquisa',
  imports: [FormsModule],
  templateUrl: './barra-pesquisa.component.html',
  styleUrl: './barra-pesquisa.component.css',
})
export class BarraPesquisaComponent {
  nomeUsuarioPesquisa = ""

  aoSubmeter() {
    console.log(this.nomeUsuarioPesquisa)
    this.nomeUsuarioPesquisa = ""
  }

}
