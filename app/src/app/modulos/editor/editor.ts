import { Component } from '@angular/core';
import { AreaEdicao } from './area-edicao/area-edicao';

@Component({
  selector: 'app-editor',
  imports: [AreaEdicao],
  templateUrl: './editor.html',
  styleUrl: './editor.css',
})
export class Editor {}
