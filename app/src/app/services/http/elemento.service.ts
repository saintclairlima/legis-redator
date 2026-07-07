import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { DtoCriacaoElemento, Elemento } from "../../entidades/elemento.model";
import { ApiService } from "../api.service";

@Injectable({ providedIn: 'root' })

export class ElementoService {
  private endpoint = 'elemento';

  constructor(private apiService: ApiService) { }

  get(id: number): Observable<Elemento> {
    return this.apiService.getOne(this.endpoint, {id});
  }

  getByDocumento(idDocumento: number): Observable<Elemento[]> {
    return this.apiService.getMany(`${this.endpoint}/documento/${idDocumento}`)
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

  reposicionar(idElementoAlvo: number, idElementoAncora: number) {
    return this.apiService.patch(
      `${this.endpoint}/reposicionar/${idElementoAlvo}`,
      {idElementoAncora: idElementoAncora}
    );
  }
}
