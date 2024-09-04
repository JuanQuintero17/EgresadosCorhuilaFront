export class Noticias {

    title: string;
    content: string;
    file: any;
    status: boolean;
    expirationDate: Date;

    constructor( title: string, content: string, file: any, status: boolean, expirationDate: Date){
        this.title = title;
        this.content = content;
        this.file = file;
        this.status = status;
        this.expirationDate = expirationDate;
    }
}
