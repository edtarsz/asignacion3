export class Carrera {
    id: string
    nombre: string;

    constructor(nombre: string) {
        this.id = crypto.randomUUID()
        this.nombre = nombre;
    }
}