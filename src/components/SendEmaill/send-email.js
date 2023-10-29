import axios from "axios";

const sendEmail = (msj) => {

    (async () => {
      // Invoca la función asíncrona inmediatamente
      try {
        const response = await axios.post(
          "https://ge3k-server.onrender.com/send-email",
          msj,
          {
            headers: {
              "Content-Type": "application/json", // Indica que estás enviando datos en formato JSON
            },
          }
        );
        // Verifica si la solicitud fue exitosa y obtén los datos de la respuesta
        if (response.status >= 200 && response.status < 300) {
          console.log("mensaje enviado");
        } else {
          // Maneja el caso en el que la solicitud no fue exitosa
          console.log("La solicitud no fue exitosa:", response.status);
        }
      } catch (error) {
        // Maneja los errores de la solicitud
        console.log("error. This email not envied");
      }
    })();
    
  };

  export default sendEmail;