import { CommonModule } from '@angular/common';
import { Component, ElementRef, QueryList, ViewChildren, WritableSignal, effect, input, model, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { DtoCriacaoElemento, Elemento, RotuloSituacaoElemento, RotuloTipoElemento, getSituacaoElemento, getTipoElemento } from '../../../entidades/elemento.model';
import { AlertaService } from '../../../services/alerta.service';
import { ElementoService } from '../../../services/http/elemento.service';
import { BlocoEdicao } from '../bloco-edicao/bloco-edicao';
import { DadosBlocoEmFoco } from '../types';

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

  constructor(
    private service: ElementoService,
    private alertaService: AlertaService
  ){
    effect(() => {
      const id = this.idDocumento();
      if (id) {
        this.service.getByDocumento(this.idDocumento()).subscribe(elementos => {
          if (elementos.length) {
            this.blocos.set(elementos.map(e => signal(e)));
            this.focarBloco(elementos[0].id);
          } else {
            // Caso seja um documento sem elementos, criar um elemento vazio
            const idElementoPai = undefined

            const novoElemento: DtoCriacaoElemento = {
              idElementoAnterior: null,
              texto: '',
              idTipoElemento: getTipoElemento(RotuloTipoElemento.ARTIGO).id,
              idSituacaoElemento: getSituacaoElemento(RotuloSituacaoElemento.Rascunho).id,
              idDocumento: this.idDocumento(),
              idElementoSeguinte: undefined,
              idElementoPai: idElementoPai ?? undefined,
            }
            
            this.service.criar(novoElemento).subscribe(elementoCriado => {
              const novoSignal = signal(elementoCriado);
              this.blocos.set([novoSignal]);              
              this.focarBloco(elementoCriado.id, true, false);
            });
          }
        });
      }
    });
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

  aoSoltar(event: DragEvent, idAncora: number) {
    event.preventDefault();
    const idAlvo = Number(event.dataTransfer?.getData('text/plain'));
    if (!idAlvo || idAlvo === idAncora) return;
    
    // Guarda o estado da interface para fazer rollback em caso de erro
    const estadoAnterior = this.blocos();

    this.service.reposicionar(idAlvo, idAncora)
    .subscribe({
      next: (resultado) => {},
      error: (erro) => {
        this.blocos.set(estadoAnterior);
        this.alertaService.mostrarNotificacao('Erro ao salvar posição. Revertendo alterações...', {estilo:'erro'}); 
        console.error('Erro ao salvar posição. Revertendo alterações...', erro);
      }
    })

    this.blocos.update(atual => {
      const idxAlvo = atual.findIndex(b => b().id === idAlvo);
      const idxAncora = atual.findIndex(b => b().id === idAncora);
      if (idxAlvo === -1 || idxAncora === -1) return atual;
      const listaAtualizada = [...atual];
      const [removido] = listaAtualizada.splice(idxAlvo, 1);
      const novoIdxInsercao = idxAlvo < idxAncora ? idxAncora - 1 : idxAncora;
      listaAtualizada.splice(novoIdxInsercao, 0, removido);
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

    this.service.deletar(idBloco)
    .subscribe({
      next: () => {
        this.blocos.update(lista => {
          const nova = [...lista];
          nova.splice(indiceRemover, 1);
          return nova;
        });

        if (this.blocos().length === 0) {
          const novoElemento: DtoCriacaoElemento = {
            idElementoAnterior: null,
            idDocumento: this.idDocumento(),
            idTipoElemento: getTipoElemento(RotuloTipoElemento.ARTIGO).id,
            texto: '',
            idSituacaoElemento: getSituacaoElemento(RotuloSituacaoElemento.Rascunho).id,
          };

          this.service.criar(novoElemento)
          .subscribe(elementoCriado => {
            const novoSignal = signal(elementoCriado);
            this.blocos.set([novoSignal]);
            this.focarBloco(elementoCriado.id, true, false);
          });

        } else {
          const proximoIndice = Math.max(0, indiceRemover - 1);
          const blocoFoco = this.blocos()[proximoIndice];

          if (blocoFoco) {
            this.focarBloco(blocoFoco().id, true, false);
          }
          this.focarBloco(this.blocos()[proximoIndice]().id, true, false);
        }
        
      },
      error: (erro) => {
        this.alertaService.mostrarNotificacao('Erro ao carregar documento', {estilo: 'erro'})
        console.error('Erro ao carregar documento', erro);
      }
    });
  }
}