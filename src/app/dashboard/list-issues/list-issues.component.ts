import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material';

import { GithubApiService } from './../github.api.service';
import { Issue } from '../github.model';

@Component({
  selector: 'app-list-issues',
  templateUrl: './list-issues.component.html',
  styleUrls: ['./list-issues.component.css']
})
export class ListIssuesComponent implements OnInit, OnDestroy {
  private issueSubscription: Subscription;

  private issues = [];
  private dataSource: MatTableDataSource<Issue>;
  private headers = ['number', 'title', 'user', 'labels', 'state', 'created'];

  constructor(private githubApiService: GithubApiService) {}

  ngOnInit(): void {
    this.issueSubscription = this.githubApiService.readIssues().subscribe((issues: Issue[]) => {
      this.issues = issues;
      this.dataSource = new MatTableDataSource(issues);
    });
  }

  ngOnDestroy(): void {
    if (this.issueSubscription) {
      this.issueSubscription.unsubscribe();
    }
  }

  private selectRow(row: Issue): void {
    // TODO: Implement method
  }
}
