import { Injectable } from "@angular/core";
import { ApiService } from "../api.service";
import { Observable } from "rxjs";
import { Documento, DocumentoQuery, DtoCriacaoDocumento } from "../../entidades/documento.model";
import { ListaDtoResposta } from "./lista.dto";

@Injectable({ providedIn: 'root' })

export class DocumentoService {
  private endpoint = 'documento';

  constructor(private apiService: ApiService) { }

  listar(): Observable<Documento[]> {
    return this.apiService.getMany(`${this.endpoint}`)
  }
  
  get(id: number): Observable<Documento> {
    return this.apiService.getOne(`${this.endpoint}/${id}`);
  }

  buscar(query?: DocumentoQuery): Observable<ListaDtoResposta<Documento>> {
    return this.apiService.getOne(this.endpoint, query);
  }

  criar(dadosDocumento: DtoCriacaoDocumento): Observable<Documento> {
    return this.apiService.post(this.endpoint, dadosDocumento);
  }

  atualizar(id: number, documento: Partial<DtoCriacaoDocumento>): Observable<Documento> {
    return this.apiService.patch(`${this.endpoint}/${id}`, documento);
  }

  deletar(id: number): Observable<void> {
    return this.apiService.delete(`${this.endpoint}/${id}`);  
  }

}
