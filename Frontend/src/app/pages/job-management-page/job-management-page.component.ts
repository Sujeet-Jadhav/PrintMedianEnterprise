import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Job } from '../../models/job.interface';

@Component({
  selector: 'app-job-management-page',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './job-management-page.component.html',
  styleUrls: ['./job-management-page.component.scss'],
})
export class JobManagementPageComponent implements OnInit {
  addJobForm!: FormGroup;
  pendingJobs: Job[] = [];
  completedJobs: Job[] = [];
  filteredPendingJobs: Job[] = [];
  filteredCompletedJobs: Job[] = [];
  pendingSearchTerm = '';
  completedSearchTerm = '';

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadMockData();
  }

  initializeForm(): void {
    this.addJobForm = this.fb.group({
      clientName: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.minLength(3)]],
      amount: ['', [Validators.required, Validators.min(1)]],
    });
  }

  loadMockData(): void {
    // Mock data for demonstration
    this.pendingJobs = [
      {
        id: 1,
        serialNumber: 1,
        clientName: 'Joy',
        description: 'A4 Size Papers (20 Box)',
        amount: 2000,
        jobStatus: 'pending',
        paymentStatus: 'pending',
        createdAt: new Date('2025-10-21'),
      },
    ];

    this.completedJobs = [
      {
        id: 2,
        serialNumber: 2,
        clientName: 'Samer',
        description: 'Business Card (100 peice)',
        amount: 5000,
        jobStatus: 'completed',
        paymentStatus: 'completed',
        createdAt: new Date('2025-10-21'),
      },
    ];

    this.filteredPendingJobs = [...this.pendingJobs];
    this.filteredCompletedJobs = [...this.completedJobs];
  }

  onAddJob(): void {
    if (this.addJobForm.valid) {
      const newJob: Job = {
        id: Date.now(),
        serialNumber: this.pendingJobs.length + this.completedJobs.length + 1,
        clientName: this.addJobForm.value.clientName,
        description: this.addJobForm.value.description,
        amount: this.addJobForm.value.amount,
        jobStatus: 'pending',
        paymentStatus: 'pending',
        createdAt: new Date(),
      };

      this.pendingJobs.unshift(newJob);
      this.filteredPendingJobs = [...this.pendingJobs];
      this.addJobForm.reset();
    }
  }

  onSearchPending(): void {
    this.filteredPendingJobs = this.pendingJobs.filter(
      (job) =>
        job.clientName
          .toLowerCase()
          .includes(this.pendingSearchTerm.toLowerCase()) ||
        job.description
          .toLowerCase()
          .includes(this.pendingSearchTerm.toLowerCase())
    );
  }

  onSearchCompleted(): void {
    this.filteredCompletedJobs = this.completedJobs.filter(
      (job) =>
        job.clientName
          .toLowerCase()
          .includes(this.completedSearchTerm.toLowerCase()) ||
        job.description
          .toLowerCase()
          .includes(this.completedSearchTerm.toLowerCase())
    );
  }

  markAsCompleted(job: Job): void {
    job.jobStatus = 'completed';
    this.moveJobToCompleted(job);
  }

  markAsPending(job: Job): void {
    job.jobStatus = 'pending';
    this.moveJobToPending(job);
  }

  updatePaymentStatus(job: Job, status: 'pending' | 'completed'): void {
    job.paymentStatus = status;
  }

  deleteJob(job: Job, isPending: boolean): void {
    if (confirm(`Are you sure you want to delete job for ${job.clientName}?`)) {
      if (isPending) {
        this.pendingJobs = this.pendingJobs.filter((j) => j.id !== job.id);
        this.filteredPendingJobs = [...this.pendingJobs];
      } else {
        this.completedJobs = this.completedJobs.filter((j) => j.id !== job.id);
        this.filteredCompletedJobs = [...this.completedJobs];
      }
    }
  }

  private moveJobToCompleted(job: Job): void {
    this.pendingJobs = this.pendingJobs.filter((j) => j.id !== job.id);
    this.completedJobs.unshift(job);
    this.filteredPendingJobs = [...this.pendingJobs];
    this.filteredCompletedJobs = [...this.completedJobs];
  }

  private moveJobToPending(job: Job): void {
    this.completedJobs = this.completedJobs.filter((j) => j.id !== job.id);
    this.pendingJobs.unshift(job);
    this.filteredPendingJobs = [...this.pendingJobs];
    this.filteredCompletedJobs = [...this.completedJobs];
  }
}
