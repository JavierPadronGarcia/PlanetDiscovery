import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModifySatellitesPage } from './modify-satellites.page';

describe('ModifySatellitesPage', () => {
  let component: ModifySatellitesPage;
  let fixture: ComponentFixture<ModifySatellitesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ModifySatellitesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
