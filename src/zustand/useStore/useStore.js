import { create } from "zustand"; // crear estados globales y actions
import zukeeper from 'zukeeper' //poder usar la extension de chrome para zustand("zustand dev-tools")
import axios from "axios";

export const useStore = create(zukeeper((set) => ({
    //estados globales, initial state:
    sales: [], //ofertas
    allProducts:[], //productos todos
    currentProducts:[], // para categorias
    category:'all', //categoria actual
    brand:'all', //Theme actual
    maxPrice:0, //maximo precio
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
    },

    // Obtiene todos los productos y filtra por categoría
    getAllProductsByCategory: (category) => {
        const fetchProducts = async () => {
            try {
                const {data} =  await axios.get('https://dummyjson.com/products')
                const productsByCategory = data.products.filter((product) => product.category === category )
                const categoryMaxPrice = Math.max(...productsByCategory.map(product => product.price));
               
                set(state => {
                   return { 
                    ...state, maxPrice: categoryMaxPrice, category:category,
                    allProducts: data.products, 
                    currentProducts: productsByCategory}
                });
            } catch (error) {
                console.error("Error to get the products: ", error);
                set(state => ({
                    ...state, 
                    allProducts: [], 
                    currentProducts: []
                }));
            }
          
        }
        fetchProducts()
    },


 // Obtiene todos los productos y los filtra por Theme
    getAllProductsByTheme: (brand) => {
        const fetchProducts = async () => {
            try {
                const {data} =  await axios.get('https://dummyjson.com/products')
                const productsByCategory = data.products.filter((product) => product.brand === brand)

                const categoryMaxPrice = Math.max(...productsByCategory.map(product => product.price));
               
                set(state => ({
                    ...state, maxPrice: categoryMaxPrice, brand:brand,
                    allProducts: data.products, 
                    currentProducts: productsByCategory
                }));

            } catch (error) {
                console.error("Error to get the products: ", error);
                set(state => ({
                    ...state, 
                    allProducts: [], 
                    currentProducts: []
                }));
            }

        }
        fetchProducts()
    },

  // Filtra los currentProducts por precio y tema
    filterByPriceAndTheme: () => set((state) => {

      const filtredProducts = state.allProducts.filter(product => product.price <= state.maxPrice && (state.brand === 'all' || product.brand === state.brand)
      && product.category === state.category)

      return {
        ...state, currentProducts:filtredProducts
      }
    }),

    // Filtra los currentProducts por precio y categoria
    filterByPriceAndCategory: () => set((state) => {

        const filtredProducts = state.allProducts.filter(product => product.price <= state.maxPrice && (state.category === 'all' || product.category === state.category) && product.brand === state.brand)
        return {
          ...state, currentProducts:filtredProducts
        }
  
      }),

  //Actulizar el estado de filtros cuando el usuario hace click en un nuevo filtro, categoria o precio.
  setFilters: (newState) => set((newState)),

 // Ordena los productos actuales por precio y categoría
    sortCurrentProductsByPrice: (order) => set((state) => {
        const sortedProducts = [...state.currentProducts].sort((a, b) => {
            if (order === 'asc') {
                return a.price - b.price;
            } else if (order === 'desc') {
                return b.price - a.price;
            } else {
                return 0;
            }
        });
    
        return {
            ...state, 
            currentProducts: sortedProducts
        }
    }),
})))