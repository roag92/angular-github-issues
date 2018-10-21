import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MatFormFieldModule, MatAutocompleteModule, MatSelectModule, MatInputModule } from '@angular/material';
import { LMarkdownEditorModule } from 'ngx-markdown-editor';

import { of } from 'rxjs';

import { environment } from './../../../environments/environment';

import { NewIssueComponent } from './new-issue.component';
import { GithubApiService } from './../../github/github.api.service';
import { GITHUB_CONFIG } from './../../github/github.model';

describe('NewIssueCompoenet', () => {
  let fixture: ComponentFixture<NewIssueComponent>;
  let newIssue: NewIssueComponent;

  let githubApiService: GithubApiService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewIssueComponent],
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        MatFormFieldModule,
        MatInputModule,
        MatAutocompleteModule,
        MatSelectModule,
        LMarkdownEditorModule,
        RouterTestingModule.withRoutes([{ path: 'list', component: NewIssueComponent }])
      ],
      providers: [GithubApiService, { provide: GITHUB_CONFIG, useValue: environment.github }]
    }).compileComponents();
    fixture = TestBed.createComponent(NewIssueComponent);
    newIssue = fixture.debugElement.componentInstance;
    githubApiService = TestBed.get(GithubApiService);
  }));

  afterEach(() => {
    document.body.removeChild(fixture.debugElement.nativeElement);
  });

  it('should create the new issue component', async(() => {
    expect(newIssue).toBeTruthy();
  }));

  it('should call the githubApiService methods readAssignees(), readLabels() and readMilestones()', () => {
    spyOn(githubApiService, 'readAssignees').and.returnValue(of([]));
    spyOn(githubApiService, 'readLabels').and.returnValue(of([]));
    spyOn(githubApiService, 'readMilestones').and.returnValue(of([]));
    newIssue.ngOnInit();
    fixture.detectChanges();
    expect(githubApiService.readAssignees).toHaveBeenCalled();
    expect(githubApiService.readLabels).toHaveBeenCalled();
    expect(githubApiService.readMilestones).toHaveBeenCalled();
  });

  it('should be disabled the milestone select when the list is empty or undefined', () => {
    spyOn(githubApiService, 'readAssignees').and.returnValue(of([]));
    spyOn(githubApiService, 'readLabels').and.returnValue(of([]));
    spyOn(githubApiService, 'readMilestones').and.returnValue(of([]));
    githubApiService.readMilestones();
    fixture.detectChanges();
    newIssue.ngOnInit();
    fixture.detectChanges();
    expect(githubApiService.readMilestones).toHaveBeenCalled();
    const select = fixture.debugElement.query(By.css('#milestone'));
    expect(select.attributes['aria-disabled']).toBe('true');
  });

  it('should the method githubApiService.createIssue()', () => {
    spyOn(githubApiService, 'readAssignees').and.returnValue(of([]));
    spyOn(githubApiService, 'readLabels').and.returnValue(of([]));
    spyOn(githubApiService, 'readMilestones').and.returnValue(of([]));
    spyOn(githubApiService, 'createIssue').and.returnValue(of({}));
    newIssue.ngOnInit();
    fixture.detectChanges();
    fixture.debugElement.query(By.css('#title')).nativeElement.value = 'A test';
    fixture.debugElement.query(By.css('#body')).nativeElement.value = 'A test body';
    fixture.detectChanges();
    fixture.debugElement.query(By.css('#btn-submit')).nativeElement.click();
    fixture.detectChanges();
    expect(githubApiService.createIssue).toHaveBeenCalled();
    const h3 = fixture.debugElement.query(By.css('h3'));
    expect(h3.nativeElement.textContent.trim()).toBe('The issue was delivered, wait for redirect!');
  });
});
