import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MensagemDetalhes } from './mensagem-detalhes';

describe('MensagemDetalhes', () => {
  let component: MensagemDetalhes;
  let fixture: ComponentFixture<MensagemDetalhes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MensagemDetalhes],
    }).compileComponents();

    fixture = TestBed.createComponent(MensagemDetalhes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
