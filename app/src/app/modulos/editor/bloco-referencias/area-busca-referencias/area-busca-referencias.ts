import { Component, input, output, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Referencia } from '../../../../entidades/referencia.model';
import { ApiIaService } from '../../../../services/api-ia.service';
import { CartaoReferencia } from '../cartao-referencia/cartao-referencia';

@Component({
  selector: 'app-area-busca-referencias',
  imports: [CartaoReferencia, MatIconModule, MatMenuModule, MatTooltipModule],
  templateUrl: './area-busca-referencias.html',
  styleUrl: './area-busca-referencias.css',
})
export class AreaBuscaReferencias {
  numResultados = signal<number>(10);
  textoBase = input.required<string | undefined>();
  aoPesquisar = output<Referencia[]>();
  resultadosPesquisa = signal<Referencia[]>([]);

  constructor(private iaService: ApiIaService) {}
  
  alterarNumResultados(num_resultados: number): void {
    this.numResultados.set(num_resultados);
  }

  aceitarResultado(indice: number): void {
    const resultados = this.resultadosPesquisa();
    const referenciaAdicionada = resultados[indice];
    this.aoPesquisar.emit([referenciaAdicionada]);
    resultados.splice(indice, 1);
    this.resultadosPesquisa.set(resultados);
  }

  aceitarTodosResultados(): void {
    this.aoPesquisar.emit(this.resultadosPesquisa());
    this.limparResultados();
  }

  descartarResultado(indice: number): void {
    const resultados = this.resultadosPesquisa();
    resultados.splice(indice, 1);
    this.resultadosPesquisa.set(resultados);
  }
  
  limparResultados(): void {
    this.resultadosPesquisa.set([]);
  }
  
  realizarBusca(textoBuscaUsuario: string): void {
    if(!this.textoBase() && !textoBuscaUsuario) return;
    
    const textoConsulta = textoBuscaUsuario || this.textoBase()!;
    this.iaService.buscarReferencias(textoConsulta, this.numResultados(), false)
    .subscribe({
      next: (resultadosBusca) => {
        const referencias = resultadosBusca.map((resultado) => ({
            id: resultado.id,
            texto: resultado.texto,
            metadados: resultado.metadados,
            titulo: resultado.titulo,
            autor: resultado.autor,
            score: resultado.score
        }))
        this.resultadosPesquisa.set(referencias);
      },
      error: (erro) => console.error(erro),
    });
  }
}
