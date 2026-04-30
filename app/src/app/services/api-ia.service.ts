import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map, Observable } from 'rxjs';
import { Referencia } from '../entidades/elemento.model';

@Injectable({ providedIn: 'root' })
export class ApiIaService {
  private apiIaHost: string;

  constructor(private http: HttpClient) {
    this.apiIaHost = environment.apiIaUrl + '/doxxo/consulta/';
  }

  getReferencias(texto: string): Observable<Referencia[]> {
    const params = new HttpParams()
      .set('pergunta', texto)
      .set('num_resultados', 20)
      .set('reranquear', false);

    // AFAZER: Tipar as coisas
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