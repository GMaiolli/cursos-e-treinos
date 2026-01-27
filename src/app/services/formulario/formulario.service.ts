import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class FormularioService {

  constructor(private router: Router){}

  retornarInicio(){
    this.router.navigate(['/inicio'])
  }
}
