import React from 'react'
import { favoriteStore } from '../../zustand/favoriteStore/favoriteStore';
import CardContainer from '../../components/CardContainer/CardContainer';
import style from './Favorite.module.css'
const Favorite = () => {
    const { favorites } = favoriteStore()
    // useEffect(()=>{  
    //     if(!isAuthenticated) getSubTotal() // obtenemos el subtotal para mostrar si no esta autenticado   
    //     updateLocalStorage(cart) // cada q cambia cart del zustand actualizamos local storage
    //     return()=>{
    //         updateLocalStorage([]) // cuando se desmonta el componente sin ningun producto en cart limpiamos el local storage
    //     }    
    // },[cart])
    return (
        <section className='col-md-10'>
            {
                favorites.length > 0 ?
                     <CardContainer products={favorites}/>
                     : 
                    <p>There are not favorites</p>
            }
        </section>
    );
}
export default Favorite;