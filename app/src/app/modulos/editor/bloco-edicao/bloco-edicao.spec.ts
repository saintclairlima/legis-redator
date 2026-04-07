import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlocoEdicao } from './bloco-edicao';

describe('BlocoEdicao', () => {
  let component: BlocoEdicao;
  let fixture: ComponentFixture<BlocoEdicao>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlocoEdicao],
    }).compileComponents();

    fixture = TestBed.createComponent(BlocoEdicao);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
