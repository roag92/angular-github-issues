# AngularGithubIssues

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.2.5.

## Installing repository

Type `npm install` to get all dependencies.

This application does an OAuth Authentication with GitHub through Firebase to create and read issues from this repository.

## Configuring repository

Copy `src/environments/environment` content in a new file called `src/environments/environment.local.ts`. Then add your firebase and github config.

First you must create a `Firebase Project` for more information check [this](https://firebase.google.com/docs/web/setup?authuser=0).

The you must create a `Github Application` for more information check [this](https://developer.github.com/apps/building-github-apps/creating-a-github-app/).

```typescript
export const environment = {
  production: true,
  firebase: {
    apiKey: 'YOUR_API_KEY',
    authDomain: 'app-name.firebaseapp.com',
    databaseURL: 'https://app-name.firebaseio.com',
    projectId: 'app-name',
    storageBucket: 'app-name.appspot.com',
    messagingSenderId: 'xxxxx'
  },
  {
    github: {
      github: 'https://api.github.com',
      service: 'repos',
      username: 'YOUR-USERNAME',
      repository: 'YOUR-REPOSITORY'
    }
  }
});
```

> _**Important**: Don't forget to register the Firebase URL's in your Github application._

## Development server

Run `npm run start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Unit Tests

Run `ng test` to run unit test via Karma and Jasmine. For get the coverage run the command `ng test --code-coverage`.

## Angular CLI

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
