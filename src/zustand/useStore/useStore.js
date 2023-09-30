import { create } from "zustand"; // crear estados globales y actions
import zukeeper from 'zukeeper' //poder usar la extension de chrome para zustand("zustand dev-tools")

export const useStore = create(zukeeper((set) => ({
    //estados globales, initial state:
    sales: [], //ofertas
    allProducts:[], //productos todos
    currentProducts:[], // para categorias
    productDetail:[],

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
    getProductDetail:()=>{},
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
            { name: 'camiseta yamcha', description: 'camiseta talla XS para chicos y chicas', id: 10 ,price:'$50'},
            { name: 'camiseta yamcha', description: 'camiseta talla XS para chicos y chicas', id:11,price:'$50' },
            { name: 'camiseta goku', description: 'camiseta talla L para chicos y chicas', id:12,price:'$50' },
            { name: 'camiseta gohan', description: 'camiseta talla S para chicos y chicas', id: 13,price:'$50' },
            { name: 'camiseta yamcha', description: 'camiseta talla XS para chicos y chicas', id: 14 ,price:'$50'},
            { name: 'camiseta yamcha', description: 'camiseta talla XS para chicos y chicas', id: 15 ,price:'$50'},
            { name: 'camiseta goku', description: 'camiseta talla L para chicos y chicas', id: 16,price:'$50' },
            { name: 'camiseta gohan', description: 'camiseta talla S para chicos y chicas', id: 17,price:'$50' },
            { name: 'camiseta yamcha', description: 'camiseta talla XS para chicos y chicas', id: 18,price:'$50' },
            { name: 'camiseta goku', description: 'camiseta talla L para chicos y chicas', id:19,price:'$50' },
            { name: 'camiseta gohan', description: 'camiseta talla S para chicos y chicas', id: 20,price:'$50' },
            { name: 'camiseta yamcha', description: 'camiseta talla XS para chicos y chicas', id:21,price:'$50' },
            { name: 'camiseta goku', description: 'camiseta talla L para chicos y chicas', id:22,price:'$50' },
            { name: 'camiseta gohan', description: 'camiseta talla S para chicos y chicas', id: 23,price:'$50' },
            { name: 'camiseta yamcha', description: 'camiseta talla XS para chicos y chicas', id: 24 ,price:'$50'},
            { name: 'camiseta yamcha', description: 'camiseta talla XS para chicos y chicas', id: 25 ,price:'$50'},
            { name: 'camiseta yamcha', description: 'camiseta talla XS para chicos y chicas', id:26,price:'$50' },
            { name: 'camiseta goku', description: 'camiseta talla L para chicos y chicas', id:27,price:'$50' },
            { name: 'camiseta gohan', description: 'camiseta talla S para chicos y chicas', id: 28,price:'$50' },
            { name: 'camiseta yamcha', description: 'camiseta talla XS para chicos y chicas', id: 29 ,price:'$50'},
            { name: 'camiseta yamcha', description: 'camiseta talla XS para chicos y chicas', id: 30 ,price:'$50'},
            { name: 'camiseta yamcha', description: 'camiseta talla XS para chicos y chicas', id:31,price:'$50' },
            { name: 'camiseta goku', description: 'camiseta talla L para chicos y chicas', id:32,price:'$50' },
            { name: 'camiseta gohan', description: 'camiseta talla S para chicos y chicas', id: 33,price:'$50' },
            { name: 'camiseta yamcha', description: 'camiseta talla XS para chicos y chicas', id: 34 ,price:'$50'},
            { name: 'camiseta yamcha', description: 'camiseta talla XS para chicos y chicas', id: 35 ,price:'$50'},
            { name: 'camiseta yamcha', description: 'camiseta talla XS para chicos y chicas', id:36,price:'$50' },
            { name: 'camiseta goku', description: 'camiseta talla L para chicos y chicas', id:37,price:'$50' },
            { name: 'camiseta gohan', description: 'camiseta talla S para chicos y chicas', id: 38,price:'$50' },
            { name: 'camiseta yamcha', description: 'camiseta talla XS para chicos y chicas', id: 39 ,price:'$50'},
            { name: 'camiseta yamcha', description: 'camiseta talla XS para chicos y chicas', id: 40 ,price:'$50'}
        ]
        set( (state) => ({ //set sirve para modificar el initial state
            ...state,
            currentProducts  
        }))
    }
})))