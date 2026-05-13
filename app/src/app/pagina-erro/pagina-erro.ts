import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-pagina-erro',
  imports: [
    MatButtonModule
  ],
  templateUrl: './pagina-erro.html',
  styleUrl: './pagina-erro.css',
})
export class PaginaErro {

  private router = inject(Router);

  irParaInicio() {
    this.router.navigate(['inicio']);
  }
}


