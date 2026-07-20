import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Referencia, ResultadoBuscaReferencia } from '../entidades/referencia.model';

@Injectable({ providedIn: 'root' })
export class ApiIaService {
  private apiIaHost: string;

  constructor(private http: HttpClient) {
    this.apiIaHost = environment.apiIaUrl + '/doxxo/consulta/';
  }

  getUrlDocumento(url_documento: string): string {
    return `${environment.apiIaUrl}/doxxo/documento?url_documento=${url_documento}`;
  }

  buscarReferencias(texto: string, num_resultados: number = 5, reranquear: boolean = false): Observable<ResultadoBuscaReferencia[]> {
    const params = new HttpParams()
      .set('pergunta', texto)
      .set('num_resultados', num_resultados)
      .set('reranquear', reranquear);

    return this.http.get<any[]>(`${this.apiIaHost}`, { params }).pipe(
      map((resposta: any[]) => {
        return resposta.map((dado: any) => ({
          id: dado.id,
          titulo: dado.metadata.titulo,
          autor: dado.metadata.autor,
          texto: dado.document,
          metadados: JSON.stringify(dado.metadata),
          score: dado.distance,
        }));
      })
    );
  }
}