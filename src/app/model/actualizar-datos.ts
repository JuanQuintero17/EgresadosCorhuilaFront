import { PreRegistro } from "./pre-registro";

export class ActualizarDatos{
    id: string;
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
    sedeUniversitaria: string;
    ultimoNivelFormacion: string;
    facultad: string;
    ultimoSemestre: string;
    graduado: boolean;
    fechaGrado: Date;
    modalidad: string;
    calificacionObtenida: string;
    tituloTrabajoGrado: string;
    programa: string;
    tituloObtenido: string;
    labora: boolean;
    nombreEmpresa: string;
    rolEjecuta: string;
    fechaIngreso: Date;
    actividadEjecuta: string;
    rangoSalarial: string;
    tipoContrato: string;
    modalidadTrabajo: string;
    relacionFormacion: string;
    
    constructor(
        id: string,
        primerNombre: string,
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
        telefono: string,
        sedeUniversitaria: string,
        ultimoNivelFormacion: string,
        facultad: string,
        ultimoSemestre: string,
        graduado: boolean,
        fechaGrado: Date,
        modalidad: string,
        calificacionObtenida: string,
        tituloTrabajoGrado: string,
        programa: string,
        tituloObtenido: string,
        labora: boolean,
        nombreEmpresa: string,
        rolEjecuta: string,
        fechaIngreso: Date,
        actividadEjecuta: string,
        rangoSalarial: string,
        tipoContrato: string,
        modalidadTrabajo: string,
        relacionFormacion: string){
            this.id = id
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
            this.sedeUniversitaria = sedeUniversitaria;
            this.ultimoNivelFormacion = ultimoNivelFormacion;
            this.facultad = facultad;
            this.ultimoSemestre = ultimoSemestre;
            this.graduado = graduado;
            this.fechaGrado = fechaGrado;
            this.modalidad = modalidad;
            this.calificacionObtenida = calificacionObtenida;
            this.tituloTrabajoGrado = tituloTrabajoGrado;
            this.programa = programa;
            this.tituloObtenido = tituloObtenido;
            this.labora = labora;
            this.nombreEmpresa = nombreEmpresa;
            this.rolEjecuta = rolEjecuta;
            this.fechaIngreso = fechaIngreso;
            this.actividadEjecuta = actividadEjecuta;
            this.rangoSalarial = rangoSalarial;
            this.tipoContrato = tipoContrato;
            this.modalidadTrabajo = modalidadTrabajo;
            this.relacionFormacion = relacionFormacion;
        }
}
