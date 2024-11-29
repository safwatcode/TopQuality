import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesDashboardComponent } from './services-dashboard.component';

describe('ServicesDashboardComponent', () => {
  let component: ServicesDashboardComponent;
  let fixture: ComponentFixture<ServicesDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ServicesDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicesDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
