import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaBuscaReferencias } from './area-busca-referencias';

describe('AreaBuscaReferencias', () => {
  let component: AreaBuscaReferencias;
  let fixture: ComponentFixture<AreaBuscaReferencias>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AreaBuscaReferencias],
    }).compileComponents();

    fixture = TestBed.createComponent(AreaBuscaReferencias);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
