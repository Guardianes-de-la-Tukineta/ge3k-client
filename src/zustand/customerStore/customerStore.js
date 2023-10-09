import { create } from "zustand"; // crear estados globales y actions
import zukeeper from 'zukeeper' //poder usar la extension de chrome para zustand("zustand dev-tools")
import axios from "axios";
import { format } from "date-fns";

// endpoints :
//  /customers POST body:{customer}

//  /customers/:id  PUT body:{customerID}

//  /customers/email/:mail GET params: {juampillin@gmail.com}

    
  
    export const customerStore = create(
      zukeeper((set) => ({
        customerData: [],
        currentCustomer: {}, // es undefined o talves se colocara el perfil de invitado
        
        createCustomer: async (customer) => {
          const fecha = customer.birthdate; 
          // Convierte el objeto Date en una cadena de fecha en formato "AAAA-MM-DD"
          customer.birthdate= format(fecha, "yyyy-MM-dd");
          console.log("creo el cusotmer ",customer);
          try {
              const response = await axios.post('https://ge3k-server.onrender.com/customers/', customer, {
                  headers: {
                      'Content-Type': 'application/json', // Indica que estás enviando datos en formato JSON
              },
            });
        
            // Verifica si la solicitud fue exitosa y obtén los datos de la respuesta
            if (response.status === 201) {
                const data = response.data;
            
                set((state) => ({
                ...state,
                currentCustomer: data,
              }));
            } else {
                // Maneja el caso en el que la solicitud no fue exitosa
                console.error('La solicitud no fue exitosa:', response.status, response.statusText);
              }
            } catch (error) {
                // Maneja los errores de la solicitud
                console.error('Error al crear el cliente:', error);
              }
              customer.birthdate= fecha;// cambio otra vez el formato de la fecha para que no rompa todo
            },

            updateteCustomer: async (customer) => {
              const fecha = customer.birthdate; 
              // Convierte el objeto Date en una cadena de fecha en formato "AAAA-MM-DD"
              customer.birthdate= format(fecha, "yyyy-MM-dd");
              console.log("cUpdateo el cusotmer ",customer);
              try {
                  const response = await axios.put(`https://ge3k-server.onrender.com/customers/email/${email}`, customer, {
                      headers: {
                          'Content-Type': 'application/json', // Indica que estás enviando datos en formato JSON
                  },
                });
            
                // Verifica si la solicitud fue exitosa y obtén los datos de la respuesta
                if (response.status === 201) {
                    // const data = response.data;
                
                    set((state) => ({
                    ...state,
                    currentCustomer: customer,
                  }));
                } else {
                    // Maneja el caso en el que la solicitud no fue exitosa
                    console.error('La solicitud no fue exitosa:', response.status, response.statusText);
                  }
                } catch (error) {
                    // Maneja los errores de la solicitud
                    console.error('Error al actualizar el cliente:', error);
                  }
                  customer.birthdate= fecha;// cambio otra vez el formato de la fecha para que no rompa todo
                },
      
    
        
        /*la action que sigue busca un customer en el back con su id*/      
        getCustomerByEmail: async (email) => {
          console.log("CUSTOMER get email", email);
          try {
            const response = await axios.get(`https://ge3k-server.onrender.com/customers/email/${email}`);
        
            if (response.status === 200) { // Cambiado de 201 a 200 para verificar si la respuesta es exitosa
              const { data } = response;
              set((state) => ({
                ...state,
                currentCustomer: data,
              }));
            } else {
              // Maneja el caso en el que el perfil no esté registrado
              console.error('El email no fue encontrado en la base de datos:');
              set((state) => ({
                ...state,
                currentCustomer: {},
              }));
            }
          } catch (error) {
            console.error("Error obteniendo customer:", error);
          }
        },  
     

        // getAllCustomer: () => {
        //   const customers = customerStore.getState().customerData;
        //   set((state) => ({
        //     ...state,
        //     customerData: customers,
        //   }));
        // },
      
      /*no esta implementado el delete*/
      //   deleteCustomer: (id)=>{
      //     set((state)=>({
      //         ...state,
      //         currentCustomer: {}
      //     }))
      // },
  }))
);
window.store = customerStore;