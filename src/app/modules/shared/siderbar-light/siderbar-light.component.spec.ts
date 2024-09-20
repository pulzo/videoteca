import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiderbarLightComponent } from './siderbar-light.component';

describe('SiderbarLightComponent', () => {
  let component: SiderbarLightComponent;
  let fixture: ComponentFixture<SiderbarLightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SiderbarLightComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SiderbarLightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
