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
  if (!/^[A-Za-z]{2,10}$/.test(datos.name)) {
    errors.name = "El nombre debe contener solo letras y tener entre 2 y 10 caracteres.";
  }

  // Validación del campo "surname"
  if (!/^[A-Za-z]{2,10}$/.test(datos.surname)) {
    errors.surname = "El apellido debe contener solo letras y tener entre 2 y 10 caracteres.";
  }

  // // Validación del campo "birthdate"
  // const eighteenYearsAgo = subYears(new Date(), 18);
  // if (!isBefore(datos.birthdate, eighteenYearsAgo)) {
  //   errors.birthdate = "Debes ser mayor de edad para registrarte.";
  // }

  // Validación del campo "phone"
  if (!/^[0-9]{11,14}$/.test(datos.phone)) {
    errors.phone = "El número de teléfono debe contener solo números y tener entre 11 y 14 dígitos.";
  }

  // Validación del campo "address"
  if (!/^[A-Za-z0-9\s.,-]*$/.test(datos.address)) {
    errors.address = "La dirección debe contener letras, números y algunos símbolos comunes.";
  }

  return errors;
};
