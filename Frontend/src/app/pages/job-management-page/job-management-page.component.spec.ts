import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JobManagementPageComponent } from './job-management-page.component';

describe('JobManagementPageComponent', () => {
  let component: JobManagementPageComponent;
  let fixture: ComponentFixture<JobManagementPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobManagementPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(JobManagementPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
