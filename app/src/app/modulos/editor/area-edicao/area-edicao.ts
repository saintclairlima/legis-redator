import { Component, signal, ChangeDetectionStrategy, model, ElementRef, QueryList, ViewChildren, WritableSignal, input, effect } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { DadosBlocoEmFoco } from '../types';
import { BlocoEdicao } from '../bloco-edicao/bloco-edicao';
import { Elemento, RotuloTipoElemento, TipoElemento, DtoCriacaoElemento, SituacaoElemento, RotuloSituacaoElemento, getTipoElemento, getSituacaoElemento } from '../../../entidades/elemento.model';
import { ElementoService } from '../../../services/http/elemento.service';

@Component({
  selector: 'app-area-edicao',
  standalone: true,
  imports: [BlocoEdicao, CommonModule, MatIconModule],
  templateUrl: './area-edicao.html',
  styleUrl: './area-edicao.css'
})
export class AreaEdicao {

  idDocumento = input.required<number>();

  blocos = signal<WritableSignal<Elemento>[]>([]);

  //AFAZER: Mudar para usar o tipo de elemento
  nivelIdentacao = 0;

  @ViewChildren('wrapperBloco') blocosHtml!: QueryList<ElementRef<HTMLElement>>;

  dadosBlocoFoco = signal<DadosBlocoEmFoco | null>(null);
  focoManual = model<boolean>(false);
  idBlocoSendoArrastado = signal<number | null>(null);
  idBlocoSobreposto = signal<number | null>(null);

  constructor(private service: ElementoService){

    effect(() => {
      const id = this.idDocumento();
      if (id) {
        this.service.getByDocumento(this.idDocumento()).subscribe(elementos => {
          if (elementos.length) {
            this.blocos.set(elementos.map(e => signal(e)));
            this.focarBloco(elementos[0].id);
          }
        });
      }

     })
    
  }

  aoIniciarArrasto(evento: DragEvent, id: number) {
    this.idBlocoSendoArrastado.set(id);
    evento.dataTransfer?.setData('text/plain', id.toString());
  }

  aoArrastarSobre(event: DragEvent, id: number) {
    event.preventDefault();
    if (this.idBlocoSendoArrastado() !== id) this.idBlocoSobreposto.set(id);
  }

  aoSairDoArrasto() { this.idBlocoSobreposto.set(null); }

  aoFinalizarArrasto() { this.idBlocoSendoArrastado.set(null); this.idBlocoSobreposto.set(null); }

  aoSoltar(event: DragEvent, targetId: number) {
    event.preventDefault();
    const draggedId = Number(event.dataTransfer?.getData('text/plain'));
    if (!draggedId || draggedId === targetId) return;

    this.blocos.update(current => {
      const draggedIdx = current.findIndex(b => b().id === draggedId);
      const targetIdx = current.findIndex(b => b().id === targetId);
      const listaAtualizada = [...current];
      const [removed] = listaAtualizada.splice(draggedIdx, 1);
      listaAtualizada.splice(targetIdx, 0, removed);
      return listaAtualizada;
    });
    this.aoFinalizarArrasto();
  }

  private focarBloco(id: number, cursorNoFim: boolean = false, mostrarMenu: boolean = false) {
    this.dadosBlocoFoco.set({ id, cursorNoFim, mostrarMenu })
    this.focoManual.set(true);
  }

  desativarFocoManual(){
    this.focoManual.set(false);
    this.dadosBlocoFoco.set(null);
  }

  aoAdicionarBlocoAbaixo(indice: number, mostrarMenu?: boolean) {
    const dadosBlocoOrigem = this.blocos()[indice]()
    const idElementoSeguinte = this.blocos()[indice + 1]?.().id;
    //AFAZER criar a lógica de pegar o elemento pai
    const idElementoPai = undefined

    const novoElemento: DtoCriacaoElemento = {
      idElementoAnterior: dadosBlocoOrigem.id,
      texto: '',
      idTipoElemento: dadosBlocoOrigem.tipoElemento.id,
      idSituacaoElemento: dadosBlocoOrigem.situacaoElemento.id,
      idDocumento: this.idDocumento(),
      idElementoSeguinte: idElementoSeguinte ?? undefined,
      idElementoPai: idElementoPai ?? undefined,
    }

    this.service.criar(novoElemento).subscribe(elementoCriado => {
      //Atualiza o bloco anterior para apontar para o novo elemento
      this.blocos()[indice].update(bloco => ({ ...bloco, idElementoSeguinte: elementoCriado.id }));

      const novoSignal = signal(elementoCriado);
      this.blocos.update(listaBlocos => {
        const listaAtualizada = [...listaBlocos];
        listaAtualizada.splice(indice + 1, 0, novoSignal);
        return listaAtualizada;
      });
      
      this.focarBloco(elementoCriado.id, true, mostrarMenu);
    });
  }

  aoAlterarDadosBloco(idBloco: number, blocoAtualizado: Elemento) {
    const indice = this.blocos().findIndex(signalBloco => signalBloco().id === idBloco);
    if (indice === -1) {
      return; 
    }
    this.blocos()[indice].set(blocoAtualizado);
  }

  aoRemoverBloco(idBloco: number) {
    let indiceRemover = this.blocos().findIndex(b => b().id === idBloco);
    
    if (indiceRemover === -1) return;

    // Se houver somente um bloco, não remove, apenas seta ele para ficar vazio
    if (this.blocos().length === 1) {
      this.blocos()[0].set(this.gerarDadosBlocoVazio());
    } else {
      this.service.deletar(idBloco)
      .subscribe({
        next: () => {
          this.blocos.update(lista => {
            const nova = [...lista];
            nova.splice(indiceRemover, 1);
            return nova;
          });
        },
        error: (erro) => {}
      });
    }

    const proximoIndice = Math.max(0, indiceRemover - 1);
    this.focarBloco(this.blocos()[proximoIndice]().id, true, false);
  }

  gerarDadosBlocoVazio(): Elemento {
    const tipoElementoPadrao: TipoElemento = getTipoElemento(RotuloTipoElemento.ARTIGO);
    const situacaoElementoPadrao: SituacaoElemento = getSituacaoElemento(RotuloSituacaoElemento.Rascunho);
    return { id: 0, tipoElemento: tipoElementoPadrao, texto: '', situacaoElemento: situacaoElementoPadrao };
  }
}