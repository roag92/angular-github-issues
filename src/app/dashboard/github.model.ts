export class Issue {

  title: string;
  body: string;
  assignee: string;
  milestone: number;
  labels: Array<string>;
  assignees: Array<string>;

}

export class Assignee {

  login: string;
  id: number;

}

export class Label {

  id: number;
  name: string;
  color: string;

}

export class Milestone {

}
