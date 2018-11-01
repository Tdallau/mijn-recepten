export class MijnReceptenRegister {
    name: string;
    email: string;
    passwordHash: string;
    role: string;

    constructor(name: string, password: string, email: string) {
        this.name = name;
        this.email = email;
        this.passwordHash = password;
        this.role = 'User';
    }
}
