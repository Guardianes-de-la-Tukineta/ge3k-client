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

            { name: 'Camiseta goku', image: 'https://media.camden.es/product/camiseta-goku-800x800.jpg',  rating: '★  ★ ★ ★ ☆', price: '$23.000', id: 1 },
            { name: 'Camiseta gohan', image: 'https://media.nauticamilanonline.com/product/camiseta-gohan-dragon-ball-z-adulto-800x800_AapHj6p.jpg', rating: '★  ★ ★ ★ ☆', price: '$23.000', id: 2 },
            { name: 'Funko Harry Potter', image: 'https://asgardstores.com/664/funko-pop-harry-potter.jpg', rating: '★  ★ ★ ★ ☆', price: '$23.000', id: 3 },
            { name: 'Kit Gammer', image: 'https://s.yimg.com/os/creatr-uploaded-images/2020-11/1890a840-2f98-11eb-b77f-f5769099341b', rating: '★  ★ ★ ★ ☆', price: '$23.000', id: 4 },
            { name: 'Mug programmer', image: "https://image.spreadshirtmedia.net/image-server/v1/products/T949A2PA2009PT25X2Y1D160403330W5745H6895/views/3,width=550,height=550,appearanceId=2,backgroundColor=F2F2F2,modelId=1279,crop=list/programmer-funny-geek-mug.jpg", rating: '★  ★ ★ ★ ☆', price: '$23.000', id: 5 },
            { name: 'Llavero Thor', image: 'https://i0.wp.com/tiendaufun.com/wp-content/uploads/2021/12/Llavero-Thor.jpg?fit=569%2C533&ssl=1', rating: '★  ★ ★ ★ ☆', price: '$23.000', id: 6 }
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
                const productsByCategory = products.filter((product) => product.category === category )
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
                const productsByCategory = products.filter((product) => product.theme === theme)

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

     //Setea resultados de coincidencias en la búsqueda de la searchBar
    setSearchResults: (results) => set((state) => ({
        ...state,
        searchResults: results
      })),


})))
