export class User {
    id: number;
    name: string;
    email: string;
    role: string;
    nbf: string;
    exp: string;
    password: string;
    passwordHash?: string;
    keepLogin: boolean;
}
