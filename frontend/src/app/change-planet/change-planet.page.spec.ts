import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangePlanetPage } from './change-planet.page';

describe('ChangePlanetPage', () => {
  let component: ChangePlanetPage;
  let fixture: ComponentFixture<ChangePlanetPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ChangePlanetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
