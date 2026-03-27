import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuAcoes } from './menu-acoes';

describe('MenuAcoes', () => {
  let component: MenuAcoes;
  let fixture: ComponentFixture<MenuAcoes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuAcoes],
    }).compileComponents();

    fixture = TestBed.createComponent(MenuAcoes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
