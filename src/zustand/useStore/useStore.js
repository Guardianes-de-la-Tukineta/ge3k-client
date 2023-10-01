import { create } from "zustand"; // crear estados globales y actions
import zukeeper from 'zukeeper' //poder usar la extension de chrome para zustand("zustand dev-tools")

export const useStore = create(zukeeper((set) => ({
    //estados globales, initial state:
    sales: [], //ofertas
    allProducts:[], //productos todos
    currentProducts:[], // para categorias

    productDetails:{}, // HP para el componete detail traer los detalles 

    //creamos nuestras actions
    // HP agregado por Hernan - este es el json que manda juanpi desde la ruta detail ej: http://localhost:3001/products/85f9a2dd-572f-4716-a36c-aab0cf51fce9
    // {
    //     "id": "3c7dbde7-702b-496c-9054-0a725cea2fd6",
    //     "name": "remera de github",
    //     "price": "17.00",
    //     "image": "",
    //     "description": "remera de git/github",
    //     "stock": 15,
    //     "discount": 15,
    //     "createdAt": "2023-09-30T13:56:15.742Z",
    //     "updatedAt": "2023-09-30T13:56:15.742Z",
    //     "deletedAt": null,
    //     "CategoryId": null,
    //     "ThemeId": null
    //   }
    
    getProductsDetails: (id) => {
        const details = {
            name: 'camiseta github',
            deletedAt: null,
            image: 'https://ih1.redbubble.net/image.2563740221.2392/ssrco,slim_fit_t_shirt,flatlay,101010:01c5ca27c6,front,wide_portrait,750x1000-bg,f8f8f8.jpg',
            //HP. por el momento muestro los codigos de las categorias pero necesito sus nonbres
            ThemeId: 'IDThemeGit',
            Theme: 'Git',
            CategoryId: 'IDcatCamiseta',
            Category:'Camiseta',
            stock: 24,
            price: '17.00',
            discount: 0,
            description: 'camiseta talla L para chicos y chicas',
            id: 1
        };
        set((state) => ({
            ...state,
            productDetails: details
        }));
    },
    
    
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
            { name: 'camiseta goku', description: 'camiseta talla L para chicos y chicas', id: 1,price:'$50', stock: 15, CategoryId: "codeIDcamiseta", ThemeId: "D-Ball" },
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