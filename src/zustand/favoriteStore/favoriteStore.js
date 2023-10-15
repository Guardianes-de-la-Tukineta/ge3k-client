import { create } from "zustand"; // crear estados globales y actions
import zukeeper from 'zukeeper' //poder usar la extension de chrome para zustand("zustand dev-tools")
import axios from "axios";

export const favoriteStore = create(zukeeper((set) => ({
    favorites: JSON.parse(window.localStorage.getItem("favorites"))|| [], // favoritos del user
    //conectar con back
    syncByBack:async (customerId)=>{
        try {              
            const URL='https://ge3k-server.onrender.com/'            
            const favorites = favoriteStore.getState().favorites;            
            const {data}=await axios.post(`${URL}favorites/bulk`,{
                customerId,
                products:favorites
            }) 
            console.log(favorites,data);
            set(prevState => ({
                ...prevState,
                favorites: data.products
            }))              
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
        window.localStorage.setItem("favorites",JSON.stringify(newState))
    },      
    //obtiene los productos q hay en favoritos
    getFavorites: async (idCustomer) => {
        try {
            const URL='https://ge3k-server.onrender.com/'
            console.log(idCustomer);
            const {data} = await axios(`${URL}favorites?customerId=${idCustomer}`)
            console.log(data);
            set(prevState => ({
                ...prevState,
                favorites: data.products
            }))
        } catch (error) {
            console.log(error);
        }
    },
    //add producto a favoritos
    addProductFavorite: async(isAuthenticated,customerId,newProduct) => {
        try {
            const favorites = favoriteStore.getState().favorites;            
            if (favorites.findIndex((product) => product.id === newProduct.id) < 0) {          
                set(prevState => ({
                    ...prevState,
                    favorites: [...prevState.favorites, newProduct]
                }))            
                //Add en back  
                if(isAuthenticated){
                    const URL='https://ge3k-server.onrender.com/'
                    const {data} = await axios.post(`${URL}favorites`,{
                        customerId,
                        productId:newProduct.id,                    
                    })
                    console.log(data.message);
                }
            }                   
            
        } catch (error) {
            console.log(error);
        }
    },
    //eliminar producto de favorito
    deleteProductFavorite: async(isAuthenticated, customerId,productId) => {
        try {
            const favorites = favoriteStore.getState().favorites;                     
            const result = favorites.filter((product) => product.id !== productId)
            set(prevState => ({
                ...prevState,
                favorites: result
            }))   
            //borrar en back        
            if(isAuthenticated) { 
                const URL='https://ge3k-server.onrender.com/'
                const {data} = await axios.delete(`${URL}favorites`, {
                    customerId,
                    productId
                })                
                console.log(data.message);
            } 
            
        } catch (error) {
            console.log(error);
        }
    },
})))

window.store = favoriteStore