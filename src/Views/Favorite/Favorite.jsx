import React from 'react'
import { favoriteStore } from '../../zustand/favoriteStore/favoriteStore';
import CardContainer from '../../components/CardContainer/CardContainer';
import style from './Favorite.module.css'
const Favorite = () => {
    const { favorites } = favoriteStore()  
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