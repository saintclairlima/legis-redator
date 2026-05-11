import { Component, signal, computed, ViewChild, DestroyRef, inject } from '@angular/core';

import { Documento, situacoesDocumento } from '../../entidades/documento.model';
import { DocumentoService } from '../../services/http/documento.service';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, mergeWith, startWith, switchMap } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ListaDtoResposta } from '../../services/http/lista.dto';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  imports: [MatFormFieldModule, ReactiveFormsModule, FormsModule,MatInputModule, MatSelectModule, MatPaginatorModule, MatIcon ],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css',
})
export class Inicio{
  form: FormGroup;
  private destroyRef = inject(DestroyRef);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  situacoesDocumento = situacoesDocumento;

  documentos = signal<Documento[]>([]);
  total = signal(0);

  page = signal(0);
  size = signal(10);

  searchQuery = signal('');

  // Lógica de filtro reativa e performática
  filteredDocuments = computed(() => {
    const term = this.searchQuery().toLowerCase();
    if (!term) return this.documentos();

    return this.documentos().filter(doc => 
      doc.rotulo.toLowerCase().includes(term) || 
      doc.numero.toString().includes(term)
    );
  });

  constructor (private fb: FormBuilder, private documentoService: DocumentoService, private router: Router) {
    this.form = this.fb.group({
      busca: [''],
      idSituacao: [null],
    });
  }

  ngAfterViewInit() {

    const busca$ = this.form.get('busca')!.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      startWith('')
    );

    const situacao$ = this.form.get('idSituacao')!.valueChanges.pipe(
      startWith(null)
    );

    const paginator$ = this.paginator.page.pipe(
      startWith({})
    );

    // reset de página ao filtrar
    busca$.subscribe(() => this.paginator.firstPage());
    situacao$.subscribe(() => this.paginator.firstPage());

    busca$.pipe(
      mergeWith(situacao$, paginator$),
      switchMap(() => {
        return this.documentoService.buscar({
          // Usa o operador spread pra enviar só o que não for null
          ...(this.form.value.busca && { busca: this.form.value.busca }),
          ...(this.form.value.idSituacao != null && { idSituacao: this.form.value.idSituacao }),
          page: this.paginator.pageIndex,
          size: this.paginator.pageSize,
          sort: 'numero,asc'
        });
      }),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe((resp: ListaDtoResposta<Documento>) => {
      this.documentos.set(resp.itens);
      this.total.set(resp.total);
    });
  }

  carregarDocumentos() {
    this.documentoService.listar().subscribe((docs: Documento[]) => {
      this.documentos.set(docs);
    });
  }

  updateSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchQuery.set(input.value);
  }

  // Métodos de navegação/ação
  novoDocumento() { /* router.navigate... */ }

  editar(id: number) {
    this.router.navigate(['/editor', id]);
  }
  
  visualizar(id: number) { /* ... */ } 

}