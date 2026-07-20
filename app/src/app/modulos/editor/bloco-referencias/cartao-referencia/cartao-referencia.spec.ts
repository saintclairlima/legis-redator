import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartaoReferencia } from './cartao-referencia';

describe('CartaoReferencia', () => {
  let component: CartaoReferencia;
  let fixture: ComponentFixture<CartaoReferencia>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartaoReferencia],
    }).compileComponents();

    fixture = TestBed.createComponent(CartaoReferencia);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
