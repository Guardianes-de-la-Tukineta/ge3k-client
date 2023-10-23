import { create } from "zustand"; // crear estados globales y actions
import zukeeper from 'zukeeper' //poder usar la extension de chrome para zustand("zustand dev-tools")
import axios from "axios";
import Swal from 'sweetalert2'

export const cartStore = create(zukeeper((set) => ({
    cart: JSON.parse(window.localStorage.getItem("cart")) || [], // productos en carrito de compra
    subTotal: 0, // guarda el subTotal en el carrito
    visibility:true, // para cuando se le da al icono del carrito del navBar
    borderAlert:false,  // para pintar de rojo el borde de los botones de cantidades
    //conectar con back
    syncByBack:async (customerId)=>{
        try {              
            const URL='https://ge3k-server.onrender.com/'            
            const cart = cartStore.getState().cart;
            const cartByBack=cart.map(({product,quantity})=>{
                return {
                    productId:product.id,
                    quantity:quantity
                }
            })
            const {data}=await axios.post(`${URL}carts/bulk`,{
                customerId,
                products:cartByBack
            })
            console.log(data);             
            set(prevState => ({
                ...prevState,
                cart: data.cart.products,
                subTotal:data.cart.total
            })) 
            if(data.message)  {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: data.message, 
                    confirmButtonColor: '#ff6824',
                    allowOutsideClick: false                     
                })  
            }else if(data.stockLimit){
                set(prevState => ({ //actualizamos subtotal con el back
                    ...prevState,
                    borderAlert:true                    
                }))
                const msg='The quantities in the cart of the following products were updated to the maximum available stock'
                Swal.fire({
                    position: 'center',
                    iconHtml: '<i class="bi bi-cart-x-fill" style="color: #000;"></i>',
                    html: `<div style="text-align: left;">${msg}<br><ul>${data.stockLimit.map((elem) => `<li>${elem}</li>`).join('')}</ul></div>`,
                    confirmButtonColor: '#ff6824'
                }).then((result)=>{
                    if(result.isConfirmed){
                        set(prevState => ({ //cuando el user da al boton de o ocultamos el borde rojo
                            ...prevState,
                            borderAlert:false                    
                        }))
                        Swal.fire({
                            position: 'center',
                            icon:'success',
                            html: `<div style="text-align: left;">${msg}<br><ul>${data.stockLimit.map((elem) => `<li>${elem}</li>`).join('')}</ul></div>`,
                            showConfirmButton: false,
                            timer: 2000
                        })
                    }
                })                
            }        
        } catch (error) {
            console.log(error);
        }        
    },
    //cambiar de visibilidad
    setVisibility: (atribute) => {
        !atribute ?  //si no mandamos atributo
        set(prevState=>({
            visibility:prevState.visibility?false:true //cambiamos la visibilidad 
        }))    
        : 
        set(prevState=>({
            visibility:atribute //cambiamos la visibilidad con el true o false que venga 
        })) 
    },
    //update localStorage con estado global
    updateLocalStorage: (newState) => {
        window.localStorage.setItem("cart",JSON.stringify(newState))
    },      
    //obtiene los productos q hay en carrito
    getCartProducts: async (idCustomer) => {
        try {
            const URL='https://ge3k-server.onrender.com/'
            console.log(idCustomer);
            const {data} = await axios(`${URL}carts?customerId=${idCustomer}`)
            console.log(data);
            set(prevState => ({
                ...prevState,
                cart: data.products,
                subTotal:data.total
            }))
        } catch (error) {
            console.log(error);
        }
    },
    //add producto a cart
    addProductToCart: async(isAuthenticated,customerId,newProduct) => {
        try {
            const cart = cartStore.getState().cart;          
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
    //eliminar el card del local
    deleteCart: ()=>{  
        console.log("borre el cart zustand");
        set(prevState => ({
            ...prevState,
            cart: []
        }))  
    },
    //eliminar producto de cart
    deleteProductCart: async(isAuthenticated, idCustomer,idproduct) => {
        try {
            const cart = cartStore.getState().cart;                     
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
            const cart = cartStore.getState().cart;
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
                        borderAlert:true                    
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
                                borderAlert:false                    
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
        }
    },   
})))

window.store = cartStore