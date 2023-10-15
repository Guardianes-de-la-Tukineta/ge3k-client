import React from 'react'
import { favoriteStore } from '../../zustand/favoriteStore/favoriteStore';
import CardProduct from '../../components/CardProduct/CardProduct'
import CardContainer from '../../components/CardContainer/CardContainer';
const Favorite = () => {
    const { favorites } = favoriteStore()
    return (
        <section>
            {
                favorites.length > 0 ?
                     <CardContainer products={favorites}/>
                     : 
                <p>No hay favoritos</p>
            }

        </section>
    );
}

export default Favorite;