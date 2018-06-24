class Global {
  constructor() {
    this.user = null;
    this.endpoint = 'http://172.16.218.218:8081';
    this.socket = null;
    this.usersOnline = [];
  }
}

export default (new Global());
