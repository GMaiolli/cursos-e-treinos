
import { Component, input } from '@angular/core';
import { RouterLink } from "@angular/router";
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-botao-padronizado',
  imports: [RouterLink, MatIconModule],
  templateUrl: './botao-padronizado.component.html',
  styleUrl: './botao-padronizado.component.css',
})
export class BotaoPadronizadoComponent {
  texto = input<string>();
  icone = input<string>();
  rota = input<string|string[]>();
  tipo = input<string>('button');
  tipoDeBotao = input<'primario' | 'secundario'>('primario');


  private classesBotao: Record<string, string> = { //esse aqui entender melhor
    primario: 'botao-primario',
    secundario: 'botao-secundario'
  };

  get classeCss(): string {
    return this.classesBotao[this.tipoDeBotao()] || 'botao-primario';
  }

}
