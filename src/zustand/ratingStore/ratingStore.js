import { create } from "zustand"; // crear estados globales y actions
import zukeeper from 'zukeeper' //poder usar la extension de chrome para zustand("zustand dev-tools")
import axios from "axios";
import Swal from 'sweetalert2'

export const ratingStore = create(zukeeper((set) => ({
    ratings:[], // productos en carrito de compra    
      
    //obtiene los productos q hay en carrito
    getRatings: async (ProductId) => {
        try {
            const URL='https://ge3k-server.onrender.com/'           
            const {data} = await axios(`${URL}ratings/${ProductId}`)
            console.log(data);
            set(prevState => ({
                ...prevState,
                ratings: data.ratings,                
            }))
        } catch (error) {
            console.log(error);
        }
    },
    //add producto a cart
    addRatingProduct: async(customerId,newProduct,rating) => {
        try {
            const cart = ratingStore.getState().cart;          
            if (cart.findIndex(({ product }) => product.id === newProduct.id) < 0) {          
                set(prevState => ({
                    ...prevState,
                    cart: [...prevState.cart, { product: newProduct, quantity: 1 }]
                }))
    
                //Add en back  
                if(isAuthenticated){
                    const URL='https://ge3k-server.onrender.com/'
                    const {data} = await axios.post(`${URL}carts`,{
                        customerId,
                        productId:newProduct.id,
                        quantity:1
                    })
                    console.log(data.total);
                    set(prevState => ({
                        ...prevState,
                        subTotal:data.total
                    }))
                }
            }               
        } catch (error) {
            console.log(error);
        }
    },
    //eliminar producto de cart
    deleteProductCart: async(isAuthenticated, idCustomer,idproduct) => {
        try {
            const cart = ratingStore.getState().cart;                     
            const result = cart.filter(({ product }) => product.id !== idproduct)
            set(prevState => ({
                ...prevState,
                cart: result
            }))   
            //borrar en back        
            if(isAuthenticated) { 
                const URL='https://ge3k-server.onrender.com/'
                const {data} = await axios.delete(`${URL}carts?customerId=${idCustomer}&productId=${idproduct}`)                
                console.log(data.total);
                set(prevState => ({
                    ...prevState,
                    subTotal:data.total
                }))
            }             
        } catch (error) {
            console.log(error);
        }
    },
    //modificar cantidad de producto en carrito
    setQuantity: async(isAuthenticated,customerId,productId, cant) => {
        try {
            //modificar cantidad en back  
            const cart = ratingStore.getState().cart;
            if(isAuthenticated){
                const URL='https://ge3k-server.onrender.com/'
                const {data} = await axios.post(`${URL}carts`,{
                    customerId,
                    productId,
                    quantity:cant
                })                
                if(data.message){
                    set(prevState => ({ //actualizamos subtotal con el back
                        ...prevState,
                        showAlert:true                    
                    }))
                    Swal.fire({  //mostramos alerta
                        position: 'center',
                        icon: 'error',
                        title:data.message, 
                        confirmButtonColor: '#ff6824', 
                        allowOutsideClick: false                   
                    }).then((result)=>{
                        if(result.isConfirmed) {
                            set(prevState => ({ //cuando el user da al boton de o ocultamos el borde rojo
                                ...prevState,
                                showAlert:false                    
                            }))
                        }
                    })  
                }
                const newCart = cart.map(({ product, quantity }) => {
                    if (product.id === productId) {
                        quantity=data.stock || cant
                    }
                    return { product, quantity }
                })  
                set(prevState => ({ //actualizamos subtotal con el back
                    ...prevState,
                    subTotal:data.total,
                    cart:newCart                    
                }))
            } else {
                const newCart = cart.map(({ product, quantity }) => {
                    if (product.id === productId) {
                        quantity=cant
                    }
                    return { product, quantity }
                })        
                set(prevState => ({
                    ...prevState,
                    cart: newCart,                
                }))                       

            }       

        } catch (error) {            
            console.log(error);
        }
    },   
    //obtener SubTotal en el precio del carrito
    getSubTotal: (isAuthenticated) => {
        if(!isAuthenticated){  // mientras no este autenticado, trabajamos con esta logica
            const cart = ratingStore.getState().cart;        
            const subTotal = cart.reduce((accumulator, item) => { // calculamos el subtotal de los precios en el carrito
                const price = item.product.price;
                const quantity = item.quantity;
                return accumulator + (price * quantity);
            }, 0);// inicial valor por si el array esta vacio
            
            set(prevState => ({
                ...prevState,
                subTotal:subTotal.toFixed(2) // fixed da decimales maximos para mostrar
            }))   
        }
    },   
})))

window.store = ratingStore