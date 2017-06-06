export class User {
  username: string;
  password: string;

  constructor() {}

  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }
}
