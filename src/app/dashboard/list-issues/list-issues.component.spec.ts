import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { MatTableModule, MatTooltipModule, MatChipsModule, MatTableDataSource } from '@angular/material';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { ListIssuesComponent } from './list-issues.component';
import { GithubApiService } from './../github.api.service';
import { Issue } from '../github.model';

const mockIssues = [{
  'url': 'https://api.github.com/repos/roman92/angular-github-issues/issues/2',
  'repository_url': 'https://api.github.com/repos/roman92/angular-github-issues',
  'labels_url': 'https://api.github.com/repos/roman92/angular-github-issues/issues/2/labels{/name}',
  'comments_url': 'https://api.github.com/repos/roman92/angular-github-issues/issues/2/comments',
  'events_url': 'https://api.github.com/repos/roman92/angular-github-issues/issues/2/events',
  'html_url': 'https://github.com/roman92/angular-github-issues/issues/2',
  'id': 312681678,
  'number': 2,
  'title': 'Foofdfdd',
  'user': {
    'login': 'iamdanie',
    'id': 12549001,
    'avatar_url': 'https://avatars1.githubusercontent.com/u/12549001?v=4',
    'gravatar_id': '',
    'url': 'https://api.github.com/users/iamdanie',
    'html_url': 'https://github.com/iamdanie',
    'followers_url': 'https://api.github.com/users/iamdanie/followers',
    'following_url': 'https://api.github.com/users/iamdanie/following{/other_user}',
    'gists_url': 'https://api.github.com/users/iamdanie/gists{/gist_id}',
    'starred_url': 'https://api.github.com/users/iamdanie/starred{/owner}{/repo}',
    'subscriptions_url': 'https://api.github.com/users/iamdanie/subscriptions',
    'organizations_url': 'https://api.github.com/users/iamdanie/orgs',
    'repos_url': 'https://api.github.com/users/iamdanie/repos',
    'events_url': 'https://api.github.com/users/iamdanie/events{/privacy}',
    'received_events_url': 'https://api.github.com/users/iamdanie/received_events',
    'type': 'User',
    'site_admin': false
  },
  'labels': [
  ],
  'state': 'open',
  'locked': false,
  'assignee': null,
  'assignees': [
  ],
  'milestone': null,
  'comments': 0,
  'created_at': '2018-04-09T20:47:41Z',
  'updated_at': '2018-04-09T20:47:41Z',
  'closed_at': null,
  'author_association': 'NONE',
  'body': '**fsnjnfdf**'
}, {
  'url': 'https://api.github.com/repos/roman92/angular-github-issues/issues/1',
  'repository_url': 'https://api.github.com/repos/roman92/angular-github-issues',
  'labels_url': 'https://api.github.com/repos/roman92/angular-github-issues/issues/1/labels{/name}',
  'comments_url': 'https://api.github.com/repos/roman92/angular-github-issues/issues/1/comments',
  'events_url': 'https://api.github.com/repos/roman92/angular-github-issues/issues/1/events',
  'html_url': 'https://github.com/roman92/angular-github-issues/issues/1',
  'id': 312360994,
  'number': 1,
  'title': 'Final Test',
  'user': {
    'login': 'roman92',
    'id': 5541248,
    'avatar_url': 'https://avatars1.githubusercontent.com/u/5541248?v=4',
    'gravatar_id': '',
    'url': 'https://api.github.com/users/roman92',
    'html_url': 'https://github.com/roman92',
    'followers_url': 'https://api.github.com/users/roman92/followers',
    'following_url': 'https://api.github.com/users/roman92/following{/other_user}',
    'gists_url': 'https://api.github.com/users/roman92/gists{/gist_id}',
    'starred_url': 'https://api.github.com/users/roman92/starred{/owner}{/repo}',
    'subscriptions_url': 'https://api.github.com/users/roman92/subscriptions',
    'organizations_url': 'https://api.github.com/users/roman92/orgs',
    'repos_url': 'https://api.github.com/users/roman92/repos',
    'events_url': 'https://api.github.com/users/roman92/events{/privacy}',
    'received_events_url': 'https://api.github.com/users/roman92/received_events',
    'type': 'User',
    'site_admin': false
  },
  'labels': [
    {
      'id': 895008736,
      'url': 'https://api.github.com/repos/roman92/angular-github-issues/labels/duplicate',
      'name': 'duplicate',
      'color': 'cfd3d7',
      'default': true
    },
    {
      'id': 895008737,
      'url': 'https://api.github.com/repos/roman92/angular-github-issues/labels/enhancement',
      'name': 'enhancement',
      'color': 'a2eeef',
      'default': true
    },
    {
      'id': 895008739,
      'url': 'https://api.github.com/repos/roman92/angular-github-issues/labels/good%20first%20issue',
      'name': 'good first issue',
      'color': '7057ff',
      'default': true
    }
  ],
  'state': 'open',
  'locked': false,
  'assignee': {
    'login': 'roman92',
    'id': 5541248,
    'avatar_url': 'https://avatars1.githubusercontent.com/u/5541248?v=4',
    'gravatar_id': '',
    'url': 'https://api.github.com/users/roman92',
    'html_url': 'https://github.com/roman92',
    'followers_url': 'https://api.github.com/users/roman92/followers',
    'following_url': 'https://api.github.com/users/roman92/following{/other_user}',
    'gists_url': 'https://api.github.com/users/roman92/gists{/gist_id}',
    'starred_url': 'https://api.github.com/users/roman92/starred{/owner}{/repo}',
    'subscriptions_url': 'https://api.github.com/users/roman92/subscriptions',
    'organizations_url': 'https://api.github.com/users/roman92/orgs',
    'repos_url': 'https://api.github.com/users/roman92/repos',
    'events_url': 'https://api.github.com/users/roman92/events{/privacy}',
    'received_events_url': 'https://api.github.com/users/roman92/received_events',
    'type': 'User',
    'site_admin': false
  },
  'assignees': [
    {
      'login': 'roman92',
      'id': 5541248,
      'avatar_url': 'https://avatars1.githubusercontent.com/u/5541248?v=4',
      'gravatar_id': '',
      'url': 'https://api.github.com/users/roman92',
      'html_url': 'https://github.com/roman92',
      'followers_url': 'https://api.github.com/users/roman92/followers',
      'following_url': 'https://api.github.com/users/roman92/following{/other_user}',
      'gists_url': 'https://api.github.com/users/roman92/gists{/gist_id}',
      'starred_url': 'https://api.github.com/users/roman92/starred{/owner}{/repo}',
      'subscriptions_url': 'https://api.github.com/users/roman92/subscriptions',
      'organizations_url': 'https://api.github.com/users/roman92/orgs',
      'repos_url': 'https://api.github.com/users/roman92/repos',
      'events_url': 'https://api.github.com/users/roman92/events{/privacy}',
      'received_events_url': 'https://api.github.com/users/roman92/received_events',
      'type': 'User',
      'site_admin': false
    }
  ],
  'milestone': null,
  'comments': 0,
  'created_at': '2018-04-09T01:10:54Z',
  'updated_at': '2018-04-09T01:10:54Z',
  'closed_at': null,
  'author_association': 'OWNER',
  'body': 'This is my test\n\n**By @roman92**'
}];

describe('ListIssuesComponent', () => {

  let fixture: ComponentFixture<ListIssuesComponent>;
  let listIssues: ListIssuesComponent;

  let githubApiService: GithubApiService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ListIssuesComponent
      ],
      imports: [
        HttpClientModule,
        MatTableModule,
        MatTooltipModule,
        MatChipsModule,
        RouterTestingModule
      ],
      providers: [
        GithubApiService
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(ListIssuesComponent);
    listIssues = fixture.debugElement.componentInstance;
    githubApiService = TestBed.get(GithubApiService);
  }));

  afterEach(() => {
    document.body.removeChild(fixture.debugElement.nativeElement);
  });

  it('should create the list issues component', async(() => {
    expect(listIssues).toBeTruthy();
  }));

  it('should call the method githubApiService.readIssues()', async(() => {
    spyOn(githubApiService, 'readIssues').and.returnValue(Observable.of([]));
    listIssues.ngOnInit();
    expect(githubApiService.readIssues).toHaveBeenCalled();
  }));

  it('should not show the issues tables when the issues list is empty', async(() => {
    spyOn(githubApiService, 'readIssues').and.returnValue(Observable.of([]));
    listIssues.ngOnInit();
    fixture.detectChanges();
    expect(githubApiService.readIssues).toHaveBeenCalled();
    const table = fixture.debugElement.nativeElement.querySelector('div > mat-table');
    expect(table).toBeNull();
  }));

  it('should show the issues tables when the issues list has items', async(() => {
    spyOn(githubApiService, 'readIssues').and.returnValue(Observable.of(mockIssues));
    listIssues.ngOnInit();
    fixture.detectChanges();
    expect(githubApiService.readIssues).toHaveBeenCalled();
    const table = fixture.debugElement.nativeElement.querySelector('div > mat-table');
    expect(table).toBeTruthy();
    const rows = fixture.debugElement.queryAll(By.css('div > mat-table > mat-row'));
    expect(rows.length).toBe(mockIssues.length);
  }));

});
