export const validate = (datos) => {
  //console.log("validando ", datos);
  const errors = {
    name: "",
    surname: "",
    birthdate: "",
    phone: "",
    address: "",
  };

  // Validación del campo "name"
  if (!/^[A-Za-z]{2,10}( [A-Za-z]{2,10}){0,2}$/.test(datos.name)) {
    errors.name = "The name must contain only letters, two spaces maximum and be between 2 and 20 characters in total.";
  }

  // Validación del campo "surname"
  if (!/^[A-Za-z]{2,10}( [A-Za-z]{2,10}){0,2}$/.test(datos.surname)) {
    errors.surname = "The name must contain only letters, two spaces maximum and be between 2 and 20 characters in total.";
  }

  // Validación del campo "birthdate"
  if (datos.birthdate !== "") {
    
    // Parsear la fecha de nacimiento en un objeto Date
    var partesFecha = datos.birthdate.split("-");
    var anio = parseInt(partesFecha[0], 10);
    var mes = parseInt(partesFecha[1], 10) - 1; // Restamos 1 porque los meses en JavaScript van de 0 a 11
    var dia = parseInt(partesFecha[2], 10);
    var fechaNacimientoObj = new Date(anio, mes, dia);
    // Obtener la fecha actual
    var fechaActual = new Date();
    // Calcular la diferencia de años
    var edad = fechaActual.getFullYear() - fechaNacimientoObj.getFullYear();
    
    // Verificar si la persona tiene al menos 18 años
    if (
        fechaActual.getMonth() < fechaNacimientoObj.getMonth() ||
        (fechaActual.getMonth() === fechaNacimientoObj.getMonth() && fechaActual.getDate() < fechaNacimientoObj.getDate())
      ) {
        edad--; // Restar un año si aún no ha alcanzado su cumpleaños este año
      }
      
      if (edad >= 18) {
        errors.birthdate ="";
      } else {
        errors.birthdate ="For legal reasons, users must be of legal age";
      }
    }else{
      errors.birthdate ="select your birthday";
    }
      
      // Validación del campo "phone"
  if (!/^[0-9]{10,14}$/.test(datos.phone)) {
    errors.phone = "enter your phone number only with numbers.";
  }

  // Validación del campo "address"
  if (!/^[A-Za-z0-9\s.,-]*$/.test(datos.address)) {
    errors.address = "Enter your street address and number.";
  }

  return errors;
};
