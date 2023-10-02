import { create } from "zustand"; // crear estados globales y actions
import zukeeper from 'zukeeper' //poder usar la extension de chrome para zustand("zustand dev-tools")
import axios from "axios";

      
    
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
          id: "2b3c4d5e-2345-6789-0abc-defe23456789",
          name: "Bob",
          surname: "Johnson",
          birthdate: "1985-08-20",
          email: "bob@example.com",
          password: "secure123",
          phone: "555-987-6543",
          address: "456 Elm St",
          paymentMethod: "PayPal",
          CategoryId: "54321",
          Category: "guest",
          createdAt: "2023-09-30T14:30:00.000Z",
          updatedAt: "2023-09-30T14:30:00.000Z",
          deletedAt: null,
        },
        {
          id: "3c4d5e6f-3456-7890-abcd-ef01f2345678",
          name: "Charlie",
          surname: "Brown",
          birthdate: "1992-03-10",
          email: "charlie@example.com",
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
            name: "Charlie",
            surname: "Brown",
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
            name: "Charlie",
            surname: "Brown",
            birthdate: "1992-03-10",
            email: "charl4ie@example.com",
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
    ];
  
  export const customerStore = create(
    zukeeper((set) => ({
      customerData: initialCustomerData,
      currentCustomer: 0, // es el perfil de invitado
  
      createCustomer: (customer) => {
        set((state) => ({
          customerData: [...state.customerData, customer],
        }));
      },
  
      getCustomerByEmail: (email) => {
        const customerIndex = initialCustomerData.findIndex(
          (customer) => customer.email === email
        );
  
        if (customerIndex !== -1) {
          set(() => ({
            currentCustomer: initialCustomerData[customerIndex],
          }));
        } else {
          // Puedes manejar el caso en que no se encuentre el cliente
          // set(() => ({
          //   currentCustomer: null,
          // }));
        }
      },
    }))
  );



// export const customerStore = create(zukeeper((set) => ({
//     //estados globales, initial state:
    
//     //allCustomers:[], //clientes todos
      
//     CreateCustomer: (customer) => {}, // id del cliente registado "invitado" para un cliente no registrado
//     //creamos nuestras actions
//     set((state) => ({
//         ...state,
//         customerData: customerData.push(customer)
//     }));
// }
        
//     getCustomerByEmail: (email) => {
//             //HP tengo que traer el array de todos los clientes filtrarlo con ID y devolver el resultado
//     for (let i = 0; i < customerData.length; i++) {
//         const element = customerData[i];
//         set((state) => ({
//             ...state,
//             currentCustomer: 0
//         }));
//         if (element.email === email) {
//             set((state) => ({
//                 ...state,
//                 currentCustomer: i
//             }));
//         }
//     }
    

//     // const customer = customerData[2];
//     set((state) => ({
//             ...state,
//             currentCustomer: customer
//         }));
// }
        
//     })))
        