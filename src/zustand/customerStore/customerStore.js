import { create } from "zustand"; // crear estados globales y actions
import zukeeper from 'zukeeper' //poder usar la extension de chrome para zustand("zustand dev-tools")
import axios from "axios";

// endpoints :
//  /customers POST body:{customer}

//  /customers/:id  PUT body:{customerID}

//  /customers/email/:mail GET params: {juampillin@gmail.com}

    const initialCustomerData = [
        // Tus datos de clientes iniciales aquí
        {
          id: "1a2b3c4d-1234-5678-90ab-cdef12345678",
          name: "Friendly",
          surname: "Invided",
          birthdate: "1999-12-31",
          email: "mailto@example.com",
          password: "password123",
          phone: "555-123-4567",
          address: "Calle y numero 123",
          paymentMethod: "Credit Card",
          CategoryId: "12345",
          Category: "invited",
          createdAt: "2023-09-30T14:00:00.000Z",
          updatedAt: "2023-09-30T14:00:00.000Z",
          deletedAt: null,
        },
        {
          id: "3c4d5e6f-3456-7890-abcd-ef01f2345678",
          name: "Charlie",
          surname: "Brown",
          birthdate: "1992-03-10",
          email: "mail@mail.com",
          password: "letmein123",
          phone: "555-555-5555",
          address: "789 Oak St",
          paymentMethod: "Bank Transfer",
          CategoryId: "98765",
          Category: "registered",
          createdAt: "2023-09-30T15:00:00.000Z",
          updatedAt: "2023-09-30T15:00:00.000Z",
          deletedAt: null,
        },
        {
            id: "3c4d5e6f-3456-7890-abcd-ef01f2345678",
            name: "Vero",
            surname: "Marron",
            birthdate: "1992-03-10",
            email: "charl2ie@example.com",
            password: "letmein123",
            phone: "555-555-5555",
            address: "789 Oak St",
            paymentMethod: "Bank Transfer",
            CategoryId: "98765",
            Category: "registered",
            createdAt: "2023-09-30T15:00:00.000Z",
            updatedAt: "2023-09-30T15:00:00.000Z",
            deletedAt: null,
          },
          {
            id: "3c4d5e6f-3456-7890-abcd-ef01f2345678",
            name: "Kevin",
            surname: "Salom",
            birthdate: "1987-07-21",
            email: "kevsaloms@gmail.com",
            password: "mantis23",
            phone: "555-555-5555",
            address: "789 Oak St",
            paymentMethod: "Bank Mercado Pago",
            CategoryId: "98765",
            Category: "Premium",
            createdAt: "2023-09-30T15:00:00.000Z",
            updatedAt: "2023-09-30T15:00:00.000Z",
            deletedAt: null,
          },
    ];
  
    export const customerStore = create(
      zukeeper((set) => ({
        customerData: initialCustomerData,
        currentCustomer: undefined, // es undefined o talves se colocara el perfil de invitado
        
        createCustomer: (customer) => {
          set((state) => ({
            ...state,
            currentCustomer: customer,
            customerData: [...state.customerData, customer],
          }));
        },
        
    
        getCustomerByEmail: (email) => {
          const customers = customerStore.getState().customerData;
          const customer = customers.filter(
            (customer) => customer.email === email
          );
          console.log("byEmail",customer);
          set((state) => ({
            ...state,
            currentCustomer: customer[0],
          }));
        },
              
        // getAllCustomer: () => {
        //   set({
        //     currentCustomer: initialCustomerData[0], // Restablecer al perfil de invitado
        //   });
        // },
  }))
);
window.store = customerStore;