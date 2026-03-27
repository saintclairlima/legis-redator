import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuTipos } from './menu-tipos';

describe('MenuAdicao', () => {
  let component: MenuTipos;
  let fixture: ComponentFixture<MenuTipos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuTipos],
    }).compileComponents();

    fixture = TestBed.createComponent(MenuTipos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
