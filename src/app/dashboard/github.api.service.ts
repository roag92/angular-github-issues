import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

// tslint:disable-next-line:import-blacklist
import 'rxjs/Rx';

import { IssuesService, AssigneesService, LabelsService, MilestonesServices } from './github.interface';
import { Assignee, Issue, Milestone, Label } from './github.model';

@Injectable()
export class GithubApiService implements IssuesService, AssigneesService, LabelsService, MilestonesServices {

  private rootUrl = 'https://api.github.com/repos/roman92/angular-github-issues/';

  constructor(private httpClient: HttpClient) { }

  /**
   * Create an issue
   * @returns {Obervable<Issue>}
   */
  createIssue(issue: Issue) {
    const url = `${this.rootUrl}issues`;
    return this.httpClient.post<Issue>(url, issue, { observe: 'body' });
  }

  /**
   * Read all issues
   * @returns {Obervable<Issue[]>}
   */
  readIssues() {
    const url = `${this.rootUrl}issues`;
    return this.httpClient.get<Issue[]>(url);
  }

  /**
   * Read all assignees
   * @returns {Obervable<Assignee[]>}
   */
  readAssignees() {
    const url = `${this.rootUrl}assignees`;
    return this.httpClient.get<Assignee[]>(url, { observe: 'body' });
  }

  /**
   * Read all labels
   * @returns {Obervable<Label[]>}
   */
  readLabels() {
    const url = `${this.rootUrl}labels`;
    return this.httpClient.get<Label[]>(url, { observe: 'body' });
  }

  /**
   * Read all milestones
   * @returns {Obervable<Milestone[]>}
   */
  readMilestones() {
    const url = `${this.rootUrl}milestones`;
    return this.httpClient.get<Milestone[]>(url, { observe: 'body' });
  }

}
