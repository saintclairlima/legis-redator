import { Injectable } from "@angular/core";
import { ApiService } from "../api.service";
import { DtoCriacaoElemento, Elemento } from "../../entidades/elemento.model";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })

export class ElementoService {
  private endpoint = 'elemento';

  constructor(private apiService: ApiService) { }

  getByDocumento(id: number): Observable<Elemento[]> {
    return this.apiService.getMany(`${this.endpoint}/documento/${id}`)
  }

  criar(elemento: DtoCriacaoElemento): Observable<Elemento> {
    return this.apiService.post(this.endpoint, elemento);
  }

  atualizar(id: number, elemento: Partial<DtoCriacaoElemento>): Observable<Elemento> {
    return this.apiService.patch(`${this.endpoint}/${id}`, elemento);
  }

  deletar(id: number): Observable<void> {
    return this.apiService.delete(`${this.endpoint}/${id}`);  
  }

}
