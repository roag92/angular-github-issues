# AngularGithubIssues

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.7.4.

## Installing repository

Type `npm install` to get all dependencies.

This application does an OAuth Authentication with GitHub through Firebase to create and read issues from this repository.

## Configuring repository

Modify `src/main.ts` with your custom Firebase API creedentials.

```typescript
// Line 12
firebase.initializeApp({
  apiKey: 'YOUR_API_KEY',
  authDomain: 'app-name.firebaseapp.com',
  databaseURL: 'https://app-name.firebaseio.com',
  projectId: 'app-name',
  storageBucket: 'app-name.appspot.com',
  messagingSenderId: 'xxxxx'
});
```

If you want try with your repository, you must create a Github Application for more information check the [documentation](https://developer.github.com/apps/building-github-apps/creating-a-github-app/).

_**Note**: You need add the Firebase URL's in your Github application._

You can change the repository editing the  `src/app/dashboard/github.api.service.ts` file.

```typescript
// Line 15
private rootUrl = 'https://api.github.com/repos/YOUR_USERNAME/YOUR_REPO/';
```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Unit Tests

Run `ng test` to run unit test via Karma and Jasmine. For get the coverage run the command `ng test --code-coverage`.

## Angular CLI

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
