import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiderbarDarkComponent } from './siderbar-dark.component';

describe('SiderbarDarkComponent', () => {
  let component: SiderbarDarkComponent;
  let fixture: ComponentFixture<SiderbarDarkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SiderbarDarkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SiderbarDarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
