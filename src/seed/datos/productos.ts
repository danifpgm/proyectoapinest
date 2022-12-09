import { ProductosSeed } from "../interfaces/ProductosSeed.interface";

interface DatosSeed {
    productos: ProductosSeed[];
}

export const DatosIniciales: DatosSeed = {
    productos: [
        {
            nombre: "objeto1",
            precio: 50,
            descripcion: "objeto1 descripcion",
            slug: "objeto1",
            stock: 7,
            propiedades: [ 'propiedad1', 'propiedad2' ],
            tipo: 'objeto1',
            imagenes: [
                '1740176-00-A_0_2000.jpg',
                '1740176-00-A_1.jpg',
            ]
        },
        {
            nombre: "objeto2",
            precio: 50,
            descripcion: "objeto2 descripcion",
            slug: "objeto2",
            stock: 7,
            propiedades: [ 'propiedad1', 'propiedad2' ],
            tipo: 'objeto2',
            imagenes: [
                '1740176-00-A_0_2000.jpg',
                '1740176-00-A_1.jpg',
            ]
        },
        {
            nombre: "objeto3",
            precio: 50,
            descripcion: "objeto3 descripcion",
            slug: "objeto3",
            stock: 7,
            propiedades: [ 'propiedad1', 'propiedad2' ],
            tipo: 'objeto3',
            imagenes: [
                '1740176-00-A_0_2000.jpg',
                '1740176-00-A_1.jpg',
            ]
        },
        {
            nombre: "objeto4",
            precio: 50,
            descripcion: "objeto4 descripcion",
            slug: "objeto4",
            stock: 7,
            propiedades: [ 'propiedad1', 'propiedad2' ],
            tipo: 'objeto4',
            imagenes: [
                '1740176-00-A_0_2000.jpg',
                '1740176-00-A_1.jpg',
            ]
        }
    ]
}