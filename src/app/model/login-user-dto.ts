export class LoginUserDto {

    noIdentificacion: string;
    password: string;

    constructor(noIdentificacion: string, password: string){
        this.noIdentificacion = noIdentificacion;
        this.password = password;

    }
}
