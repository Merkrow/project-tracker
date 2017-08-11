import { Project } from './index';

export class Task {
  name: string;
  description: string;
  estimate: number;
  startDate: string;
  endDate: any;
  statusId: number;
  responsibleId: number;
  typeId: number;
  projectId: number;
  reporter: {
    fullName: string;
  };
  responsible: {
    fullName: string;
  };
  reporterId: number;
  id: number;
}
