import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

/** Material design modules */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import {MatTooltipModule} from '@angular/material/tooltip';

import { LMarkdownEditorModule } from 'ngx-markdown-editor';

import { AppRoutingModule } from './app.routing.module';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { NewIssueComponent } from './dashboard/new-issue/new-issue.component';
import { ListIssuesComponent } from './dashboard/list-issues/list-issues.component';
import { AuthComponent } from './auth/auth.component';

import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth.guard.service';
import { GithubApiService } from './dashboard/github.api.service';
import { AuthInterceptor } from './auth/auth.interceptor';

import * as marked from 'marked/marked.min';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    NewIssueComponent,
    ListIssuesComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatSelectModule,
    LMarkdownEditorModule,
    MatTableModule,
    MatChipsModule,
    MatTooltipModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    GithubApiService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
