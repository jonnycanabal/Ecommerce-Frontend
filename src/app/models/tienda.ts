import { NumberSymbol } from "@angular/common";
import { Producto } from "./producto";

export class Tienda {

    id: number;
    nombre: string;
    createAt: string;
    fotoHashCode: number;
    productos: Producto[];
}
