import { Component, inject, OnInit, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, switchMap } from 'rxjs/operators';
import { CampoTextoInline } from '../../componentes/campo-texto-inline/campo-texto-inline';
import { Documento } from '../../entidades/documento.model';
import { DocumentoService } from '../../services/http/documento.service';
import { AreaEdicao } from './area-edicao/area-edicao';
import { AlertaService } from '../../services/alerta.service';

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

  constructor (
    private docService: DocumentoService,
    private router: Router,
    private alertaService: AlertaService
  ){}
  
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
    if (!this.id()) return;
    this.docService.get(this.id()!)
    .pipe(finalize(()=> {}))
    .subscribe({
      next: (doc) => {
        this.documento.set(doc);
      },
      error: (erro) => {
        console.error(erro);
        this.alertaService.mostrarNotificacao('Erro ao carregar documento', {estilo: 'erro'});
      }
    })
  }

  configurarAutoSave() {
    this.salvarSubject.pipe(
      filter(() => !!this.documento()),
      debounceTime(800),
      map(() => this.documento()!),
      distinctUntilChanged((prev, curr) => {
        const p = prev || {};
        const c = curr || {};
        return (
          p.rotulo === c.rotulo &&
          p.numero === c.numero &&
          p.ano === c.ano &&
          p.descricao === c.descricao &&
          p.idSituacaoDocumento === c.idSituacaoDocumento
        );
      }),
        switchMap(() => {
        const doc = this.documento();
        this.statusSalvamento.set('salvando');
        return this.docService.atualizar(
          doc!.id,
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
