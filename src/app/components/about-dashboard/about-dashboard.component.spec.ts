import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutDashboardComponent } from './about-dashboard.component';

describe('AboutDashboardComponent', () => {
  let component: AboutDashboardComponent;
  let fixture: ComponentFixture<AboutDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AboutDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
