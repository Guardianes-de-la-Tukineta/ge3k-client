import React from "react";
import { useForm } from "react-hook-form";

function CustomerForm({ currentCustomer, onSubmit }) {
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: currentCustomer, // Usar los valores actuales como valores iniciales
  });

  const submitForm = (data) => {
    // Enviar los datos del formulario al controlador onSubmit
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <div>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" {...register("name")} />
      </div>
      <div>
        <label htmlFor="surname">Surname:</label>
        <input type="text" id="surname" {...register("surname")} />
      </div>
      <div>
        <label htmlFor="birthdate">Birthdate:</label>
        <input type="text" id="birthdate" {...register("birthdate")} />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input type="text" id="email" {...register("email")} />
      </div>
      <div>
        <label htmlFor="phone">Phone:</label>
        <input type="text" id="phone" {...register("phone")} />
      </div>
      <div>
        <label htmlFor="address">Address:</label>
        <input type="text" id="address" {...register("address")} />
      </div>
      {/* Otras propiedades del cliente aquí */}
      <button type="submit">Guardar</button>
    </form>
  );
}

export default CustomerForm;
