import { create } from "zustand"; // crear estados globales y actions
import zukeeper from 'zukeeper' //poder usar la extension de chrome para zustand("zustand dev-tools")
import axios from "axios";

export const useStore = create(zukeeper((set) => ({
    //estados globales, initial state:
    sales: [], //ofertas
    allProducts:[], //productos todos
    currentProducts:[], // para categorias
    category:'all', //categoria actual
    brand:'all', //Theme actual, tiene ahorita brand por que la api que use tiene brand
    maxPrice:0, //maximo precio
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