import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-inicio',
  imports: [],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css',
})
export class Inicio implements OnInit {
  constructor (private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getMany('documento')
    .subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (erro) => {
        console.error(erro);
      }
    })
  }
}
