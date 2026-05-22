import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampoTextoInline } from './campo-texto-inline';

describe('CampoTextoInline', () => {
  let component: CampoTextoInline;
  let fixture: ComponentFixture<CampoTextoInline>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CampoTextoInline],
    }).compileComponents();

    fixture = TestBed.createComponent(CampoTextoInline);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
