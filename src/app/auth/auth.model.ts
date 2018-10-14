export class Credential {
  public accessToken = '';
  public providerId: string;
  public signInMethod: string;

  constructor(accessToken, providerId, signInMethod) {}

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
