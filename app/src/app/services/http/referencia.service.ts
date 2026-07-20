import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { DtoCriacaoReferencia, Referencia } from "../../entidades/referencia.model";
import { ApiService } from "../api.service";

@Injectable({ providedIn: 'root' })

export class ReferenciaService {
  private endpoint = 'referencia';

  constructor(private apiService: ApiService) { }

  getByElemento(id: number): Observable<Referencia[]> {
    return this.apiService.getMany(`${this.endpoint}/elemento/${id}`)
  }

  get(referencia: Referencia): Observable<Referencia> {
    return this.apiService.post(this.endpoint, Referencia);
  }

  criar(referencia: DtoCriacaoReferencia): Observable<Referencia> {
    return this.apiService.post(this.endpoint, referencia);
  }

  atualizar(id: number, referencia: Partial<DtoCriacaoReferencia>): Observable<Referencia> {
    return this.apiService.patch(`${this.endpoint}/${id}`, referencia);
  }

  deletar(id: number): Observable<void> {
    return this.apiService.delete(`${this.endpoint}/${id}`);  
  }
}
