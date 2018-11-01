export class Credentials {
    Username: string;
    Password: string;
    KeepLogin: boolean;

    constructor(username: string, password: string, keepLogin: boolean) {
        this.Username = username;
        this.Password = password;
        this.KeepLogin = keepLogin;
    }
}
