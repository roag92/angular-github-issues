import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth/auth.guard.service';
import { ListIssuesComponent } from './dashboard/list-issues/list-issues.component';
import { NewIssueComponent } from './dashboard/new-issue/new-issue.component';
import { AuthComponent } from './auth/auth.component';

export const APP_ROUTES: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: ListIssuesComponent },
      { path: 'new', component: NewIssueComponent }
    ]
  },
  { path: 'auth', component: AuthComponent }
];
