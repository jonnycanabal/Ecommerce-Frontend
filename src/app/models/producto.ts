import { NumberSymbol } from "@angular/common";
import { Tienda } from "./tienda";

export class Producto {
    //aqui se van a traer los datos de la clase entity de spring boot

    id: number;
    nombre: string;
    marca: string;
    precio: number;
    createAt: String;
    fotoHashCode: number;
    tienda: Tienda;
}
