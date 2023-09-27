import { create } from "zustand"; // crear estados globales y actions
import zukeeper from 'zukeeper' //poder usar la extension de chrome para zustand("zustand dev-tools")

export const useStore = create(zukeeper((set) => ({
    //estados globales, initial state:
    sales: [], //ofertas

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
    }
})))