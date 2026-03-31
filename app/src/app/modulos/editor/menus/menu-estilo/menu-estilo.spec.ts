import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuEstilo } from './menu-estilo';

describe('MenuEstilizacao', () => {
  let component: MenuEstilo;
  let fixture: ComponentFixture<MenuEstilo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuEstilo],
    }).compileComponents();

    fixture = TestBed.createComponent(MenuEstilo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
