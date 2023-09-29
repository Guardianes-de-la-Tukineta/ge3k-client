import { create } from "zustand"; // crear estados globales y actions
import zukeeper from 'zukeeper' //poder usar la extension de chrome para zustand("zustand dev-tools")

export const useStore = create(zukeeper((set) => ({
    //estados globales, initial state:
    sales: [], //ofertas
    allProducts:[], //productos todos
    currentProducts:[], // para categorias

    //creamos nuestras actions
    getSales: () => {
        const sales = [ //esto lo recibimos del back
            { name: 'camiseta goku', description: 'camiseta talla L para chicos y chicas', id: 1 },
            { name: 'camiseta gohan', description: 'camiseta talla S para chicos y chicas', id: 2 }
        ]
        set( (state) => ({ //set sirve para modificar el initial state
            ...state,
            sales  // sales:sales
        }))
    },
    getCurrentProducts:async()=>{
            const currentProducts = [ //esto lo recibimos del back
            { name: 'camiseta goku', description: 'camiseta talla L para chicos y chicas', id: 1,price:'$50' },
            { name: 'camiseta gohan', description: 'camiseta talla S para chicos y chicas', id: 2,price:'$50' },
            { name: 'camiseta yamcha', description: 'camiseta talla XS para chicos y chicas', id: 3,price:'$50' },
            { name: 'camiseta goku', description: 'camiseta talla L para chicos y chicas', id: 4,price:'$50' },
            { name: 'camiseta gohan', description: 'camiseta talla S para chicos y chicas', id: 5,price:'$50' },
            { name: 'camiseta yamcha', description: 'camiseta talla XS para chicos y chicas', id:6,price:'$50' },
            { name: 'camiseta goku', description: 'camiseta talla L para chicos y chicas', id:7,price:'$50' },
            { name: 'camiseta gohan', description: 'camiseta talla S para chicos y chicas', id: 8,price:'$50' },
            { name: 'camiseta yamcha', description: 'camiseta talla XS para chicos y chicas', id: 9 ,price:'$50'},
            { name: 'camiseta yamcha', description: 'camiseta talla XS para chicos y chicas', id: 10 ,price:'$50'}
        ]
        set( (state) => ({ //set sirve para modificar el initial state
            ...state,
            currentProducts  
        }))
    }
})))