import { Component, inject, OnInit, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, Subject } from 'rxjs';
import { debounceTime, map, switchMap } from 'rxjs/operators';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CampoTextoInline } from '../../componentes/campo-texto-inline/campo-texto-inline';
import { ApiService } from '../../services/api.service';
import { Documento } from '../../entidades/documento.model';
import { AreaEdicao } from './area-edicao/area-edicao';

@Component({
  selector: 'app-editor',
  imports: [AreaEdicao, CampoTextoInline, MatIconModule, MatProgressSpinnerModule],
  templateUrl: './editor.html',
  styleUrl: './editor.css',
})
export class Editor implements OnInit {
  private route = inject(ActivatedRoute);
  private salvarSubject = new Subject<void>();
  statusSalvamento = signal<'salvando' | 'salvo' | 'erro'>('salvo');
  documento = signal<Documento | null>(null);
  
  id = toSignal(
    this.route.paramMap.pipe(
      map(params => Number(params.get('id')))
    ),
    { initialValue: null }
  );

  constructor (private service: ApiService, private router: Router){}
  
  ngOnInit() {
    if (this.id()) {
      this.carregarDocumento();
    }
    this.configurarAutoSave();
  }

  atualizarCampo(campo: keyof Documento, valor: any) {
    this.documento.update(doc => {
      if (!doc) return doc;
      return { ...doc, [campo]: valor };
    });
    
    this.salvarSubject.next();
  }

  carregarDocumento(){
    this.service.getOne(`documento/${this.id()}`)
    .pipe(finalize(()=> {
      // AFAZER: implementar ao finalizar e erros
    }))
    .subscribe({
      next: (doc) => {
        this.documento.set(doc);
      },
      error: (erro) => console.error(erro)
    })
  }

  configurarAutoSave() {
    this.salvarSubject.pipe(
      debounceTime(800),
      switchMap(() => {
        const doc = this.documento();
        this.statusSalvamento.set('salvando');
        return this.service.patch(
          `documento/${doc!.id}`,
          {
            rotulo: doc!.rotulo,
            numero: Number(doc!.numero),
            ano: Number(doc!.ano),
            descricao: doc!.descricao,
            idSituacaoDocumento: doc!.idSituacaoDocumento
          }
        );
      })
    ).subscribe({
      next: () => {
        this.statusSalvamento.set('salvo');
      },
      error: (erro) => {
        this.statusSalvamento.set('erro');
        console.error('Erro ao salvar', erro);
      }
    });
  }
  
  voltarPaginaInicial() {
    this.router.navigate(['inicio']);
  }
}
