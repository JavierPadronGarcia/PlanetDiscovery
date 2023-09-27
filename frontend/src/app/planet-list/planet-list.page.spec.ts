import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlanetListPage } from './planet-list.page';

describe('PlanetListPage', () => {
  let component: PlanetListPage;
  let fixture: ComponentFixture<PlanetListPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PlanetListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
