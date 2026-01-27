import { Component, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-barra-pesquisa',
  imports: [FormsModule],
  templateUrl: './barra-pesquisa.component.html',
  styleUrl: './barra-pesquisa.component.css',
})
export class BarraPesquisaComponent {
  nomeUsuarioPesquisa = signal('') //signal para o input
  pesquisar = output<string>()

  aoSubmeter() {
    this.pesquisar.emit(this.nomeUsuarioPesquisa())

    // console.log(this.nomeUsuarioPesquisa)
    // this.nomeUsuarioPesquisa = ""
  }

}
