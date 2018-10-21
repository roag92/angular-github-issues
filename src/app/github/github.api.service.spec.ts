import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClientModule, HttpRequest, HttpParams } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { GithubApiService } from './github.api.service';

import { Issue, Assignee, Label, Milestone, GITHUB_CONFIG } from './github.model';
import { environment } from './../../environments/environment';

describe('GithubService', () => {
  const rootUrl = `${environment.github.api}/${environment.github.service}/${environment.github.username}/${
    environment.github.repository
  }/`;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [GithubApiService, { provide: GITHUB_CONFIG, useValue: environment.github }]
    });
  }));

  afterEach(inject([HttpTestingController], (backend: HttpTestingController) => {
    backend.verify();
  }));

  it(`should call the createIssue method`, async(
    inject(
      [GithubApiService, HttpTestingController],
      (githibApiService: GithubApiService, backend: HttpTestingController) => {
        const issue = <Issue>{
          title: '',
          body: '',
          assignee: '',
          milestone: 0,
          labels: [],
          assignees: []
        };

        githibApiService.createIssue(issue).subscribe((response: Issue) => {
          expect(response).toBe(issue);
        });

        backend.expectOne(`${rootUrl}issues`).flush(issue, { status: 200, statusText: 'Ok' });
      }
    )
  ));

  it(`should call the readIssues method`, async(
    inject(
      [GithubApiService, HttpTestingController],
      (githibApiService: GithubApiService, backend: HttpTestingController) => {
        const issues: Issue[] = [];
        issues.push(<Issue>{
          title: '',
          body: '',
          assignee: '',
          milestone: 0,
          labels: [],
          assignees: []
        });

        githibApiService.readIssues().subscribe((response: Issue[]) => {
          expect(response).toBe(issues);
        });

        backend.expectOne(`${rootUrl}issues`).flush(issues, { status: 200, statusText: 'Ok' });
      }
    )
  ));

  it(`should call the readAssignees method`, async(
    inject(
      [GithubApiService, HttpTestingController],
      (githibApiService: GithubApiService, backend: HttpTestingController) => {
        const assignees: Assignee[] = [];
        assignees.push(<Assignee>{
          login: '',
          id: 0
        });

        githibApiService.readAssignees().subscribe((response: Assignee[]) => {
          expect(response).toBe(assignees);
        });

        backend.expectOne(`${rootUrl}assignees`).flush(assignees, { status: 200, statusText: 'Ok' });
      }
    )
  ));

  it(`should call the readLabels method`, async(
    inject(
      [GithubApiService, HttpTestingController],
      (githibApiService: GithubApiService, backend: HttpTestingController) => {
        const labels: Label[] = [];
        labels.push(<Label>{
          id: 0,
          name: '',
          color: ''
        });

        githibApiService.readLabels().subscribe((response: Label[]) => {
          expect(response).toBe(labels);
        });

        backend.expectOne(`${rootUrl}labels`).flush(labels, { status: 200, statusText: 'Ok' });
      }
    )
  ));

  it(`should call the readMilestones method`, async(
    inject(
      [GithubApiService, HttpTestingController],
      (githibApiService: GithubApiService, backend: HttpTestingController) => {
        const milestones: Milestone[] = [];
        milestones.push(<Milestone>{});

        githibApiService.readMilestones().subscribe((response: Milestone[]) => {
          expect(response).toBe(milestones);
        });

        backend.expectOne(`${rootUrl}milestones`).flush(milestones, { status: 200, statusText: 'Ok' });
      }
    )
  ));
});
