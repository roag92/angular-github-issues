import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { IssuesService, AssigneesService, LabelsService, MilestonesServices } from './github.interface';
import { Assignee, Issue, Milestone, Label } from './github.model';

@Injectable()
export class GithubApiService implements IssuesService, AssigneesService, LabelsService, MilestonesServices {

  private rootUrl = 'https://api.github.com/repos/roman92/angular-github-issues/';

  constructor(private httpClient: HttpClient) { }

  createIssue(issue: Issue): Observable<Issue> {
    const url = `${this.rootUrl}issues`;
    return this.httpClient.post<Issue>(url, issue, { observe: 'body' });
  }

  readIssues(): Observable<Issue[]> {
    const url = `${this.rootUrl}issues`;
    return this.httpClient.get<Issue[]>(url);
  }

  readAssignees(): Observable<Assignee[]> {
    const url = `${this.rootUrl}assignees`;
    return this.httpClient.get<Assignee[]>(url, { observe: 'body' });
  }

  readLabels(): Observable<Label[]> {
    const url = `${this.rootUrl}labels`;
    return this.httpClient.get<Label[]>(url, { observe: 'body' });
  }

  readMilestones(): Observable<Milestone[]> {
    const url = `${this.rootUrl}milestones`;
    return this.httpClient.get<Milestone[]>(url, { observe: 'body' });
  }

}
