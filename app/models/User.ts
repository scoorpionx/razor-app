export class User {
    id;
    email;
    password;
    name;
    cpf;
    role;
    description;

    constructor(user) {
        this.id = user.id;
        this.email = user.email;
        this.password = user.password;
        this.name = user.name;
        this.cpf = user.cpf;
        this.role = user.role;
        this.description = user.description || ''
    }
}