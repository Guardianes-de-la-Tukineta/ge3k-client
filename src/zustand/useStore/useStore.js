import { create } from "zustand"; // crear estados globales y actions
import zukeeper from 'zukeeper' //poder usar la extension de chrome para zustand("zustand dev-tools")
import axios from "axios";

export const useStore = create(zukeeper((set) => ({
    //estados globales, initial state:    
    sales: [], //ofertas    
    allProducts: [], //productos todos
    sortedProducts: [], //para darle permanencia al order al combinar filtros
    currentProducts: [], // para categorias
    category: 'all', //categoria actual
    theme: 'all', //Theme actual, tiene ahorita brand por que la api que use tiene brand
    initialMaxPrice: 0, //Como tope para el input tipo rango
    maxPrice: 0, //para filtrar por precio    
    productDetails: {}, // HP para el componete detail traer los detalles 
    suggestion: [],
    categories: ["all"],
    themes: ["all"],

    //action para obtener todos los productos
    getAllProducts: async () => {
        const { data } = await axios.get('https://ge3k-server.onrender.com/products/')
        set((state) => {
            return {
                ...state,
                allProducts: data,
                sortedProducts: data,
            }
        })
    },

    getSuggestionsFromBack: async (search) => {
        

        if(search === '') {
            set((state) => {
                return {
                    ...state,
                    suggestion: [],
                }
            }) 
        } else if(search === undefined){
return
        } else{



            const URL = 'https://ge3k-server.onrender.com/products?name=';
            // console.log(`voy a buscar esto: ${URL + search}`)
            const { data } = await axios.get(URL + search)
            // console.log(data)
            if (data.length > 0) {
                // HP tambien seteo los fitros de theme y category en ALL
                
                set((state) => {
                    return {
                        ...state,
                        suggestion: data,
                        category: "all",
                        theme: 'all',
                    } 
                })
            } else if(data.length === 0){
                set((state) => {
                    return {
                        ...state,
                        suggestion: [],
                    } 
                })
            }
        }
    },

    setStateWithSuggestion: () => set((state) => {
        const categoryMaxPrice = Math.ceil(Math.max(...state.suggestion.map(product => product.price)));
        console.log(state.suggestion)
        return {
            ...state, allProducts: state.suggestion,
            sortedProducts: state.suggestion,
            currentProducts: state.suggestion,
            maxPrice: categoryMaxPrice,
            initialMaxPrice: categoryMaxPrice
        }
    }),

    getAllCategories: async () => {
        const URLBACK = "https://ge3k-server.onrender.com/categories";
        const result = ["all"];
        try {
          const res = await axios(URLBACK);
          for (let i = 0; i < res.data.length; i++) {
            const e = res.data[i];
            result.push(e.name);
          }
          set((state) => ({
            ...state,
            categories: result
          }));
        } catch (error) {
          console.log(error);
        }           
      },
     
    getAllThemes: async () => {
        const URLBACK = "https://ge3k-server.onrender.com/themes";
        const result = ["all"];
        try {
          const res = await axios(URLBACK);
          for (let i = 0; i < res.data.length; i++) {
            const e = res.data[i];
            result.push(e.name);
          }
          set((state) => ({
            ...state,
            themes: result
          }));
        } catch (error) {
          console.log(error);
        }           
      }, 

    getProductsDetails: async (id) => {
        const { data } = await axios.get(`https://ge3k-server.onrender.com/products/${id}`)
        set((state) => ({
            ...state,
            productDetails: data
        }));
    },
    deletePorductDetail: (id) => {
        set((state) => ({
            ...state,
            productDetails: {}
        }))
    },
    // obtiene todos los productos y filtra los que tienen valor no igual a null
    getSales: async () => {
        try {
            const { data } = await axios.get(`https://ge3k-server.onrender.com/products/`);

            const filteredProducts = data.filter(product => product.discount !== null);
            set((state) => ({
                ...state,
                sales: filteredProducts
            }));
        } catch (error) {
            console.error("Error getting sales:", error);
        }
    },
    // para cuando se desmonte el componente search
    resetAll: () => {
        set((state) => ({
            ...state,
            allProducts: [], //productos todos
            sortedProducts: [], 
            currentProducts: [],
            maxPrice: 0,
            initialMaxPrice: 0,
            suggestion: []
        }))
    },
    // Obtiene todos los productos y filtra por categoría
    getAllProductsByCategory: (category) => {
        const fetchProducts = async () => {
            try {
                let products = [];
               
                if (useStore.getState().allProducts.length === 0) {
                    const { data } = await axios.get('https://ge3k-server.onrender.com/products/')
                    products = data
                } else {
                    products = useStore.getState().allProducts
                }
                const productsByCategory = products.filter((product) => product.categoryName === category)
                const categoryMaxPrice = Math.ceil(Math.max(...productsByCategory.map(product => product.price)));
                set(state => {
                    return {
                        ...state, maxPrice: categoryMaxPrice, initialMaxPrice: categoryMaxPrice, category: category,
                        allProducts: products, sortedProducts: products, theme: 'all',
                        currentProducts: productsByCategory
                    }
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
    getAllProductsByTheme: (theme) => {
        const fetchProducts = async () => {
            try {
                let products = [];
                if (useStore.getState().allProducts.length === 0) {
                    const { data } = await axios.get('https://ge3k-server.onrender.com/products/')
                    products = data
                } else {
                    products = useStore.getState().allProducts
                }
                const productsByCategory = products.filter((product) => product.themeName === theme)

                const categoryMaxPrice = Math.ceil(Math.max(...productsByCategory.map(product => product.price)));

                set(state => ({
                    ...state, maxPrice: categoryMaxPrice, theme: theme, initialMaxPrice: categoryMaxPrice,
                    allProducts: products, sortedProducts: products, category: 'all',
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
        const filtredProducts = state.sortedProducts.filter((product) => (product.price <= state.maxPrice) && (state.theme === 'all' || product.themeName === state.theme)
            && (state.category === 'all' || product.categoryName === state.category))
        return {
            ...state, currentProducts: filtredProducts
        }
    }),

    //Actulizar el estado de filtros cuando el usuario hace click en un nuevo filtro, categoria o precio.
    setFilters: (newState) => set((newState)),


    // Ordena los productos de SortedProducts y CurrentProducts por precio
    sortCurrentProductsByPrice: (order) => set((state) => {
        const sortedAllProducts = [...state.sortedProducts].sort((a, b) => {
            if (order === 'asc') {
                return a.price - b.price;
            } else if (order === 'desc') {
                return b.price - a.price;
            } else {
                return 0;
            }
        });

        const sortedCurrentProducts = [...state.currentProducts].sort((a, b) => {
            if (order === 'asc') {
                return a.price - b.price;
            } else if (order === 'desc') {
                return b.price - a.price;
            } else {
                return 0;
            }
        });

        return {
            ...state, sortedProducts: sortedAllProducts,
            currentProducts: sortedCurrentProducts
        }
    }),

    //Resetear  Orden

    resetOrder: () => set((state) => {
        const filtredProducts = state.allProducts.filter((product) => (product.price <= state.maxPrice) && (state.theme === 'all' || product.themeName === state.theme)
            && (state.category === 'all' || product.categoryName === state.category))
        return {
            ...state, sortedAllProducts: state.allProducts, currentProducts: filtredProducts
        }
    }),

})))
window.store = useStore;