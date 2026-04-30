import { Component, inject } from '@angular/core';
import { AreaEdicao } from './area-edicao/area-edicao';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/internal/operators/map';

@Component({
  selector: 'app-editor',
  imports: [AreaEdicao],
  templateUrl: './editor.html',
  styleUrl: './editor.css',
})
export class Editor {
  private route = inject(ActivatedRoute);

  id = toSignal(
    this.route.paramMap.pipe(
      map(params => Number(params.get('id')))
    ),
    { initialValue: null }
  );
}
