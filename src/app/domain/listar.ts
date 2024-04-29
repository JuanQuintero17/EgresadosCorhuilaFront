export interface Usuario{
    id: number;
    primerNombre: string;
    segundoNombre: string;
    primerApellido: string;
    segundoApellido: string;
    telefono: number;
    email: string;
    emailInstitucional: string;
    noIdentificacion: number;
    genero: string;
    edad: string;
    fechaNacimiento: string;
    carrera: string;
    anoGraduacion: string;
    fotoPerfil: number[];  // Cambié este tipo de string a number[]
    password: string;
    rol: string;
  }

  export interface UsuarioResponse{
    primerNombre: string;
    segundoNombre: string;
    primerApellido: string;
    segundoApellido: string;
    telefono: number;
    email: string;
    emailInstitucional: string;
    noIdentificacion: number;
    genero: string;
    edad: string;
    fechaNacimiento: string;
    carrera: string;
  }
