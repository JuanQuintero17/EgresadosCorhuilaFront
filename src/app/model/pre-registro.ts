export class PreRegistro {

    primerNombre: string;
    segundoNombre: string;
    primerApellido: string;
    segundoApellido: string;
    email: string;
    emailInstitucional: string;
    fechaNacimiento: Date;
    edad: string;
    tipoDocumento: string;
    noIdentificacion: string;
    ciudadRecidencia: string;
    direccionRecidencia: string;
    telefono: string;

    constructor(primerNombre: string,
        segundoNombre: string,
        primerApellido: string,
        segundoApellido: string,
        email: string,
        emailInstitucional: string,
        fechaNacimiento: Date,
        edad: string,
        tipoDocumento: string,
        noIdentificacion: string,
        ciudadRecidencia: string,
        direccionRecidencia: string,
        telefono: string){
            this.primerNombre = primerNombre;
            this.segundoNombre = segundoNombre;
            this.primerApellido = primerApellido;
            this.segundoApellido = segundoApellido;
            this.email = email;
            this.emailInstitucional = emailInstitucional;
            this.fechaNacimiento = fechaNacimiento;
            this.edad = edad;
            this.tipoDocumento = tipoDocumento;
            this.noIdentificacion = noIdentificacion;
            this.ciudadRecidencia = ciudadRecidencia;
            this.direccionRecidencia = direccionRecidencia;
            this.telefono = telefono;
        }
}
