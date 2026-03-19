import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { StringLiteral } from 'typescript';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private apiHost: string;

  constructor(private http: HttpClient) {
    this.apiHost = environment.apiUrl;
  }

  getOne(caminho: string, parametros?: any): Observable<any> {
    let params = new HttpParams();    
    if (parametros) {
      Object.keys(parametros).forEach((chave) => {
        params.append(chave, parametros[chave]);
      });
    }
    return this.http.get<any>(`${this.apiHost}/${caminho}`, {params});
  }

  getMany(caminho: string, parametros?: any): Observable<any[]> {
    let params = new HttpParams();    
    if (parametros) {
      Object.keys(parametros).forEach((chave) => {
        params.append(chave, parametros[chave]);
      });
    }
    return this.http.get<any[]>(`${this.apiHost}/${caminho}`, {params});
  }

  post(caminho: string, body: any): Observable<any> {
    return this.http.post<any>(`${this.apiHost}/${caminho}`, body);
  }

  put(caminho: string, body: any): Observable<any> {
    return this.http.put<any>(`${this.apiHost}/${caminho}`, body);
  }

  patch(caminho: string, body: any): Observable<any> {
    return this.http.patch(`${this.apiHost}/${caminho}`, body);
  }
  
  delete(caminho: StringLiteral) {
    return this.http.delete<any>(`${this.apiHost}/${caminho}`);
  }

}