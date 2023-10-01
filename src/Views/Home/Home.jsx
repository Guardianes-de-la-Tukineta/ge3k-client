import React from "react";


const Home = () => {
    
    return (
        <div>
            
        </div>
    )
}

export default Home;



// const { getSales } = useStore() //esto actua como nuestro dispatch, guardamos en la variable la action getSales
//     const { sales } = useStore.getState(); // obtenemos del estado global la variable sales(productos en oferta)

//     //hooks
//     useEffect(() => {
//         getSales() //al montar componente ejecutamos la action q modifica nuestro estado global
//     }, [])

//     return (
//         <div>
//             <h1 className='card-title'>Sales</h1>
//             <Carousel>
//                 {
//                     sales.map((product) => (
//                         <Carousel.Item key={product.id}>
//                             <CardProduct  // llamamos el componente Card pasandole como props los datos de la variable global                        
//                                 name={product.name}
//                                 description={product.description}
//                             />
//                         </Carousel.Item>
//                     ))}

//             </Carousel>
//         </div>
//     )


