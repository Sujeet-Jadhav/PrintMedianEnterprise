export interface Job {
  id: number;
  serialNumber: number;
  clientName: string;
  description: string;
  amount: number;
  jobStatus: 'pending' | 'completed';
  paymentStatus: 'pending' | 'completed';
  createdAt: Date;
  updatedAt?: Date;
}

export interface AddJobRequest {
  clientName: string;
  description: string;
  amount: number;
}
