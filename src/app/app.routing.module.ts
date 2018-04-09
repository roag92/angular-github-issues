import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ListIssuesComponent } from './dashboard/list-issues/list-issues.component';
import { NewIssueComponent } from './dashboard/new-issue/new-issue.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard.service';

const appRoutes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: ListIssuesComponent },
      { path: 'new', component: NewIssueComponent }
    ]
  },
  { path: 'auth', component: AuthComponent, }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
