import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Router, ActivatedRoute } from '@angular/router';

import { GithubApiService } from './../github.api.service';
import { Assignee, Milestone, Label, Issue } from '../github.model';

@Component({
  selector: 'app-new-issue',
  templateUrl: './new-issue.component.html',
  styleUrls: ['./new-issue.component.css']
})
export class NewIssueComponent implements OnInit, OnDestroy {

  private waitingResponse = false;
  private options = {
    hideIcons: ['Image']
  };
  private comment = '';

  /** List for selects */
  private listAssignees: Assignee[];
  private listLabels: Label[];
  private listMilestones: Milestone[];

  /** Requests of subscriptions */
  private subscriptionAssignees: Subscription;
  private subscriptionLabels: Subscription;
  private subscriptionMilestones: Subscription;
  private subscriptionCreateIssue: Subscription;

  constructor(private githubApiService: GithubApiService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.subscriptionAssignees = this.githubApiService.readAssignees().subscribe((assignees: Assignee[]) => {
      this.listAssignees = assignees;
    });
    this.subscriptionLabels = this.githubApiService.readLabels().subscribe((labels: Label[]) => {
      this.listLabels = labels;
    });
    this.subscriptionMilestones = this.githubApiService.readMilestones().subscribe((milestones: Milestone[]) => {
      this.listMilestones = milestones;
    });
  }

  ngOnDestroy() {
    this.subscriptionAssignees.unsubscribe();
    this.subscriptionLabels.unsubscribe();
    this.subscriptionMilestones.unsubscribe();
    if (this.subscriptionCreateIssue) {
      this.subscriptionCreateIssue.unsubscribe();
    }
  }

  /**
   * Parses and calls the service to create an issue
   * @param form {NgForm}
   */
  onCreateIssue(form: NgForm) {
    this.waitingResponse = true;
    const issue = form.value;
    if (issue.assignees === '') {
      delete issue.assignees;
    }
    if (issue.labels === '') {
      delete issue.labels;
    }
    this.subscriptionCreateIssue = this.githubApiService.createIssue(<Issue>issue).subscribe((response: any) => {
      this.router.navigate(['./../list'], { relativeTo: this.route });
    });
  }

}
