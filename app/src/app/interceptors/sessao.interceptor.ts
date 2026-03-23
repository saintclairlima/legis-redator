import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { JwtService } from "../services/jwt.service";
import { SessaoService } from "../services/sessao.service";

@Injectable({ providedIn: 'root' })
export class AutenticacaoInterceptor implements HttpInterceptor {
    constructor(private jwtService: JwtService, private sessaoService: SessaoService){}
    
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        console.log(this.jwtService.possuiToken())
        if (this.jwtService.possuiToken()) {
            const token = this.jwtService.recuperarToken();
            request = request.clone({ setHeaders: { Authorization: `Bearer ${token}` }});
        }

        return next.handle(request).pipe(
            catchError((error) => {
                if (error instanceof HttpErrorResponse && error.status === 401) {
                    // AFAZER: Implementar aviso
                    this.sessaoService.encerrarSessao();
                }
                return throwError(() => error);
            })
        );

    }
}