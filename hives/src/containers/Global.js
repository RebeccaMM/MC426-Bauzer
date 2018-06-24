class Global {
  constructor() {
    this.user = null;
    this.endpoint = 'http://localhost:8081';
    this.socket = null;
    this.usersOnline = [];
  }
}

export default (new Global());
