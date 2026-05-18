import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlocoReferencias } from './bloco-referencias';

describe('BlocoReferencias', () => {
  let component: BlocoReferencias;
  let fixture: ComponentFixture<BlocoReferencias>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlocoReferencias],
    }).compileComponents();

    fixture = TestBed.createComponent(BlocoReferencias);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
