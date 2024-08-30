export class CreateUserDto {

    noIdentificacion: string;
    emailInstitucional: string;
    password: string;
    rol: any

    constructor(noIdentificacion: string, emailInstitucional: string, password: string, rol: any){
        this.noIdentificacion = noIdentificacion;
        this.emailInstitucional = emailInstitucional;
        this.password = password;
        this.rol = rol;

    }
}
