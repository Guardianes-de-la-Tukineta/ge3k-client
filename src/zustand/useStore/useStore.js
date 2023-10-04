import { create } from "zustand"; // crear estados globales y actions
import zukeeper from 'zukeeper' //poder usar la extension de chrome para zustand("zustand dev-tools")
import axios from "axios";

export const useStore = create(zukeeper((set) => ({
    //estados globales, initial state:
    sales: [], //ofertas
    
    allProducts:[], //productos todos
    sortedProducts:[], //para darle permanencia al order al combinar filtros
    currentProducts:[], // para categorias
    category:'all', //categoria actual
    theme:'all', //Theme actual, tiene ahorita brand por que la api que use tiene brand
    initialMaxPrice:0, //Como tope para el input tipo rango
    maxPrice:0, //para filtrar por precio
    
    productDetails:{}, // HP para el componete detail traer los detalles 


    //action para obtener todos los productos
    getAllProducts: async()=>{
        const {data}=await axios.get('https://ge3k-server.onrender.com/products/')
        set((state)=>{
            return {
                ...state,
                allProducts:data,
                sortedProducts:data
            }
        })
    },

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
    
    getProductsDetails: async(id) => {
        const {data} = await axios.get(`https://ge3k-server.onrender.com/products/${id}`)
        set((state) => ({
            ...state,
            productDetails: data
        }));
    },
    deletePorductDetail: (id)=>{
        set((state)=>({
            ...state,
            productDetails: {}
        }))
    },    
    
    getSales: () => {
        const sales = [ //esto lo recibimos del back

        {
            "id": "8deedfae-91a6-4dfe-95da-c9e2f5c51c34",
            "name": "Mario Funny T-Shirt Unisex ",
            "price": "16.00",
            "image": "https://res.cloudinary.com/dqoi2ez7t/image/upload/v1696188861/GeekHub%20Products/81N3vj4couL._AC_UX522__ftnr3v.jpg",
            "description": "Nintendo Mens Video Gameboy Shirt - Mario, Luigi, Zelda, Kirby, and Donkey Kong Vintage Tee (Black Super Mario",
            "stock": 15,
            "discount": null,
            "category": "T-shirts",
            "theme": "Video Games"
            },
            {
                "id": "47ad1a17-77b5-4281-abd4-d2a52a2d4215",
                "name": "Darling Merch T-Shirts",
                "price": "16.99",
                "image": "https://res.cloudinary.com/dqoi2ez7t/image/upload/v1696189225/GeekHub%20Products/61dcwkA8M2L._AC_UX569__x9wfpp.jpg",
                "description": "Unisex My Dress Up Darling Merch T-Shirts Kitagawa Marin Cotton Short Sleeve Tops Anime Shirts for Adult Youth Mens Womens",
                "stock": 15,
                "discount": null,
                "category": "T-shirts",
                "theme": "Anime"
                },
                {
                    "id": "7319c565-994b-4ebb-9824-aa7c86a60fe9",
                    "name": "Programming Coffee Mug",
                    "price": "13.99",
                    "image": "https://res.cloudinary.com/dqoi2ez7t/image/upload/v1696192239/GeekHub%20Products/51rbCHGiK2L._AC_SX522__vxbrch.jpg",
                    "description": "Luxe Gifting Programming Coffee Mug 11oz White - I Hate Coding - Programmer Gift Dad Web Developer Gift Son Cybersecurity Gift Friend Information Technology Gift Coworker Funny Computer",
                    "stock": 15,
                    "discount": null,
                    "category": "Mugs",
                    "theme": "Programming"
                    },
                    {
                        "id": "a01c7e51-afb4-48cc-836a-7a21c790ba7c",
                        "name": "Programming Wrist Rest",
                        "price": "47.75",
                        "image": "https://res.cloudinary.com/dqoi2ez7t/image/upload/v1696203474/GeekHub%20Products/31Alxns6EtL._AC_SY450__abykvi.jpg",
                        "description": "DELTAHUB Carpio G2.0 - Right-Handed Truly Ergonomic Programming Wrist Rest for Mouse, Gamer Approved, Pain Relief, Anti-Fatigue, Computer, Laptop, Esports, Silicone Strap, Easy Glide (Large, Right, White)",
                        "stock": 15,
                        "discount": null,
                        "category": "PC Accesories",
                        "theme": "Programming"
                        },
                        {
                            "id": "ead1118e-4cdf-4679-9cff-170431a424f0",
                            "name": "Anime Soul Large Mouse Pad",
                            "price": "32.00",
                            "image": "https://res.cloudinary.com/dqoi2ez7t/image/upload/v1696204511/GeekHub%20Products/61prrGr3rkL._AC_SY450__cwoacs.jpg",
                            "description": "Anime Soul Eater Large Gaming Mouse Pad Extended Mousepad Non-Slip Rubber Base Mouse Pads Mat for Laptop Computer 11.8 x 31.5 in",
                            "stock": 15,
                            "discount": null,
                            "category": "PC Accesories",
                            "theme": "Anime"
                            },
                            {
                                "id": "4c294172-f7d7-43c4-981d-e41cd5ce0c9d",
                                "name": "Debugging Duck Code",
                                "price": "22.15",
                                "image": "https://res.cloudinary.com/dqoi2ez7t/image/upload/v1696215239/GeekHub%20Products/il_794xN.4963564136_8mio_gmw8gj.jpg",
                                "description": "Debugging Duck - Gift for Programmers, Collectible Figure for Programmers",
                                "stock": 15,
                                "discount": null,
                                "category": "Collectible figures",
                                "theme": "Programming"
                                }
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
                let products = [];
                if (useStore.getState().allProducts.length === 0){
                    const {data} =  await axios.get('https://ge3k-server.onrender.com/products/')
                    products = data
                } else{
                    products = useStore.getState().allProducts
                }
                const productsByCategory = products.filter((product) => product.categoryName === category )
                const categoryMaxPrice = Math.max(...productsByCategory.map(product => product.price));

              set(state => {
                        return { 
                         ...state, maxPrice: categoryMaxPrice, initialMaxPrice:categoryMaxPrice, category:category,
                         allProducts: products, sortedProducts:products, theme:'all',
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
    getAllProductsByTheme: (theme) => {
        const fetchProducts = async () => {
            try {
            let products = [];
            if (useStore.getState().allProducts.length === 0){
                const {data} =  await axios.get('https://ge3k-server.onrender.com/products/')
                products = data
            } else{
                products = useStore.getState().allProducts
            }
                const productsByCategory = products.filter((product) => product.themeName === theme)

                const categoryMaxPrice = Math.max(...productsByCategory.map(product => product.price));
               console.log(categoryMaxPrice)
                set(state => ({
                    ...state, maxPrice: categoryMaxPrice, theme:theme, initialMaxPrice:categoryMaxPrice,
                    allProducts: products, sortedProducts:products, category:'all',
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
    const filtredProducts = state.sortedProducts.filter((product) => (product.price <= state.maxPrice) && (state.theme === 'all' || product.theme === state.theme)
    && (state.category ==='all' || product.category === state.category))
    return {
      ...state, currentProducts:filtredProducts
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
            ...state, sortedProducts:sortedAllProducts,
            currentProducts: sortedCurrentProducts
        }
    }),

    //Resetear  Orden

    resetOrder: () => set((state) => {
        console.log('holfffis')
        const filtredProducts = state.allProducts.filter((product) => (product.price <= state.maxPrice) && (state.theme === 'all' || product.theme === state.theme)
        && (state.category ==='all' || product.category === state.category))
        console.log(filtredProducts)
        return {
          ...state, sortedAllProducts:state.allProducts, currentProducts:filtredProducts
        }
      }),

})))

