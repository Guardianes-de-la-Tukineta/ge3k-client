import { create } from "zustand"; // crear estados globales y actions
import zukeeper from 'zukeeper' //poder usar la extension de chrome para zustand("zustand dev-tools")
import axios from "axios";

export const cartStore = create(zukeeper((set) => ({
    cart: [{product:{name:"camiseta goku",id:1,price:55},quantity:1},{product:{name:"camiseta gohan",id:2,price:5},quantity:1}], // productos en carrito de compra
    subTotal: 0, // guarda el subTotal en el carrito

    //obtiene los productos q hay en carrito
    getCartProducts: async () => {
        try {
            const cartProducts = await axios.get('https://ge3k-server.onrender.com/cart')
            set(prevState => ({
                ...prevState,
                cart: cartProducts
            }))
        } catch (error) {
            console.log(error);
        }
    },
    //add producto a cart
    addProductToCart: (newProduct) => {
        const cart = cartStore.getState().cart;
        if (cart.findIndex(({ product }) => product.id === newProduct.id) < 0) {
            set(prevState => ({
                ...prevState,
                cart: [...prevState.cart, { product: newProduct, quantity: 1 }]
            }))
        }
    },
    //eliminar producto de cart
    deleteProductCart: (id) => {
        const cart = cartStore.getState().cart;
        const result = cart.filter(({ product }) => product.id !== id)
        set(prevState => ({
            ...prevState,
            cart: result
        }))
    },
    //modificar cantidad de producto en carrito
    setQuantity: (id, cant) => {
        const cart = cartStore.getState().cart;
        const newCart = cart.map(({ product, quantity }) => {
            if (product.id === id) {
                quantity = cant
            }
            return { product, quantity }
        })
        console.log(newCart);
        set(prevState => ({
            ...prevState,
            cart: newCart
        }))
    },
    //obtener SubTotal en el precio del carrito
    getSubTotal: () => {
        const cart = cartStore.getState().cart;        
        const subTotal = cart.reduce((accumulator, item) => { // calculamos el subtotal de los precios en el carrito
            const price = item.product.price;
            const quantity = item.quantity;
            return accumulator + (price * quantity);
        }, 0);// inicial valor por si el array esta vacio
        
        set(prevState => ({
            ...prevState,
            subTotal:subTotal.toFixed(2) // fixed da decimales maximos para mostrar
        }))
        
    }})))

window.store = cartStore