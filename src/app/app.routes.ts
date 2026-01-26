import { Routes } from '@angular/router';
import { TelaInicialComponent } from './paginas/tela-inicial/tela-inicial.component';
import { CriacaoComponent } from './paginas/criacao/criacao.component';

export const routes: Routes = [
    {path: "inicio", component: TelaInicialComponent},
    {path: "criacao", component: CriacaoComponent }
];
