import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { MensagemErroService } from '../services/mensagem-erro/mensagem-erro.service';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';

export const erroInterceptor: HttpInterceptorFn = (req, next) => {
  
  const mensagemErroService = inject(MensagemErroService) //como eh uma função, a injeção ocorre assim
  
  return next(req).pipe(
    catchError((erro:HttpErrorResponse) => {
      const mensagemErro = obterMensagemDeErro(erro.status)
      mensagemErroService.mostrarMensagemDeErro(mensagemErro)
      return throwError(() => erro)
    })
  );


  function obterMensagemDeErro(status: number): string {
    const mensagensDeErro: Record<number,string> = {
      0: "Erro de conexão. Verifique sua internet.",
      404: "O recurso solicitado não foi encontrado.",
      500: "Erro interno do servidor."
    }

    return mensagensDeErro[status] || 'Ocorreu um erro inesperado'
  }
};
