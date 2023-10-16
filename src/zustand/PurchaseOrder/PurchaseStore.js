import { create } from "zustand"; // crear estados globales y actions
import zukeeper from 'zukeeper' //poder usar la extension de chrome para zustand("zustand dev-tools")
import axios from "axios";

export const PurchaseStore = create(zukeeper((set) => ({
    order: {},
    

    // CreatedOrder: async (email) => {
    //     try {
    //       // Crear un objeto que contenga el correo electrónico del usuario
    //       const customerData = { email };
    //         console.log("created order",customerData, email);
    //       // Realizar una solicitud para crear la nueva orden en el servidor
    //       const response = await axios.post("https://ge3k-server.onrender.com/orders", customerData);
    //       if (response.status === 201) { 
    //         const { data } = response;
    //         console.log("esta es la respuesta", response);
    //         set((state) => ({
    //           ...state,
    //           order: data,
    //         }));
    //         return data; // Retorna la nueva orden creada
    //       } else {
    //         console.error('No se pudo crear la orden:', response);
    //         return null;
    //       }
    //     } catch (error) {
    //       console.error("Error al crear la orden:", error);
    //       return null;
    //     }
    // },

    // Simulación de creación de orden
    CreatedOrder: async (userData) => {
        try { 
          const newOrderData = {
            orderID: "12345", // ID de la orden simulada
            ...userData,
          };
    
          set((state) => ({
            ...state,
            order: newOrderData,
          }));
          
          return newOrderData; 
        } catch (error) {
          console.error("Error al crear la orden:", error);
          return null;
        }
    },
      
})));



window.store = PurchaseStore;