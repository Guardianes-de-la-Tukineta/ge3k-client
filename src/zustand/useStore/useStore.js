import { create } from "zustand"; // crear estados globales y actions
import zukeeper from 'zukeeper' //poder usar la extension de chrome para zustand("zustand dev-tools")
import axios from "axios";

export const useStore = create(zukeeper((set) => ({
    //estados globales, initial state:
    sales: [], //ofertas
    allProducts:[], //productos todos
    currentProducts:[], // para categorias
    category:'all', //categoria actual
    brand:'all', //Theme actual, tiene ahorita brand por que la api use tienes brand
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

  // Filtra los productos por precio, categoria y tematica
  filterProducts: () => set((state) => {
    const filtredProducts = state.allProducts.filter((product) => (product.price <= state.maxPrice) && (state.brand === 'all' || product.brand === state.brand)
    && (state.category === 'all' || product.category === state.category))
    return {
      ...state, currentProducts:filtredProducts
    }
  }),


  //Actulizar el estado de filtros cuando el usuario hace click en un nuevo filtro, categoria o precio.
  setFilters: (newState) => set((newState)),


 // Ordena los productos actuales por precio
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