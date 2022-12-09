export interface ProductosSeed {
    nombre: string;
    precio: number;
    descripcion: string;
    slug: string;
    stock: number;
    propiedades: string[];
    tipo: TiposValidos;
    imagenes: string[];
}

type TiposValidos = 'objeto1'| 'objeto2'| 'objeto3' | 'objeto4';