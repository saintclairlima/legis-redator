import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaEdicao } from './area-edicao';

describe('AreaEdicao', () => {
  let component: AreaEdicao;
  let fixture: ComponentFixture<AreaEdicao>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AreaEdicao],
    }).compileComponents();

    fixture = TestBed.createComponent(AreaEdicao);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
