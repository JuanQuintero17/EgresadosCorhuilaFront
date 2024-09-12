export class ActualizarPassword {

    noIdentificacion: String;
    password: string;
    email: string;

    constructor(noIdentificacion: String, password: string, email: string,) {
        this.noIdentificacion = noIdentificacion,
        this.password = password,
        this.email = email
    }
}
