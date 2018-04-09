import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { MatTableDataSource } from '@angular/material';

import { GithubApiService } from './../github.api.service';
import { Issue } from '../github.model';
import { DataSource } from '@angular/cdk/table';

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

  constructor(private githubApiService: GithubApiService) { }

  ngOnInit() {
    this.issueSubscription = this.githubApiService.readIssues().subscribe((issues: Issue[]) => {
      this.issues = issues;
      this.dataSource = new MatTableDataSource(issues);
    });
  }

  ngOnDestroy() {
    this.issueSubscription.unsubscribe();
  }

  selectRow(row: Issue) {
      console.log(row);
  }

}
