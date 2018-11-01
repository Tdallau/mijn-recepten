export class MijnReceptenLogonRequest {
    Email: string;
    Password: string;
    // SiteUrl: string;
    // KeepLogin: boolean;

    constructor(email: string, password: string) {
        this.Email = email;
        this.Password = password;
        // this.SiteUrl = siteUrl;
        // this.KeepLogin = keepLogin;
    }
}
