export class Credential {
  constructor(public oauthAccessToken: string, public providerId: string, public signInMethod: string) {}
}

export class User {
  avatar_url: string;
  email: string;
  location: string;
  name: string;
  username: string;
}

export interface Auth {
  credential: Credential;
  user: User;
}
