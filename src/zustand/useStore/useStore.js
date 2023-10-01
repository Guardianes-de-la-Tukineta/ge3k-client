import { create } from "zustand"; // crear estados globales y actions
import zukeeper from 'zukeeper' //poder usar la extension de chrome para zustand("zustand dev-tools")

export const useStore = create(zukeeper((set) => ({
    //estados globales, initial state:
    sales: [], //ofertas

    //creamos nuestras actions
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
    }
})))