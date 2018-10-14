import { Issue, Assignee, Label, Milestone } from './github.model';
import { Observable } from 'rxjs';

export interface IssuesService {
  createIssue(issue: Issue): Observable<Issue>;
  readIssues(): Observable<Issue[]>;
}

export interface AssigneesService {
  readAssignees(): Observable<Assignee[]>;
}

export interface LabelsService {
  readLabels(): Observable<Label[]>;
}

export interface MilestonesServices {
  readMilestones(): Observable<Milestone[]>;
}
