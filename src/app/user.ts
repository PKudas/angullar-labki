export interface Role {
    role: string;
}

export class User {
    email: string;
    roles: Role;

    constructor(authData) {
        this.email = authData.email;
    }
}
