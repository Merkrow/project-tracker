import { Project } from './index';

export class Task {
  Name: string;
  Description: string;
  Estimate: number;
  StartDate: string;
  EndDate: any;
  StatusId: number;
  ResponsibleId: number;
  TypeId: number;
  ProjectId: number;
  Reporter: {
    FullName: string;
  };
  Responsible: {
    FullName: string;
  };
  ReporterId: number;
  Id: number;
}
