import React, {useState} from 'react'
import style from './FormAddProduct.module.css'
import CardProductAdmin from '../CardProductAdmin/CardProductAdmin'
import { useForm, Controller  } from 'react-hook-form';


const FormAddProduct = () => {

    const { register, control, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);
  
    // Observa los cambios en los campos del formulario
    const {name, description, image, price, discount, stock, categoryName, themeName, newCategoryName, newThemeName } = watch();
    const watchAllFields = watch();
    console.log(newThemeName); // Muestra los valores actuales de los campos

     // Tus opciones para categoryName y themeName
  const categories = ['Categoría 1', 'Categoría 2', 'Categoría 3', 'Nueva categoría'];
  const themes = ['Tema 1', 'Tema 2', 'Tema 3', 'New Theme'];

     // Estado local para mostrar los campos de entrada
  const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);
  const [showNewThemeInput, setShowNewThemeInput] = useState(false);


  return (
    <div className={`${style.formAddProductContainer} container`}>

        <div className={`row ${style.rowContainer}`}>

    <form onSubmit={handleSubmit(onSubmit)} className={`col-md-7 ${style.AddProductForm}`}>
      <label>
        <span>Nombre:</span>
        <input {...register('name', { required: true, maxLength: 100 })} />
        {errors.name && <p>Este campo es obligatorio</p>}
      </label>

      <label>
        <span>Descripción:</span>
        <input {...register('description', { required: true, maxLength: 500 })} />
        {errors.description && <p>Este campo es obligatorio</p>}
      </label>

      <label>
        <span>Imagen:</span>
        <input {...register('image', { required: true })} />
        {errors.image && <p>Este campo es obligatorio</p>}
      </label>

      <label>
        <span>Precio:</span>
        <input type="number" {...register('price', { required: true, min: 0 })} />
        {errors.price && <p>Este campo es obligatorio y debe ser un número positivo</p>}
      </label>

   

      <label>
        <span>Descuento (opcional):</span>
        <input type="number" {...register('discount', { min: 0 })} />
        {errors.discount && <p>Este campo debe ser un número positivo o nulo</p>}
      </label>

      <label>
        <span>Stock:</span>
        <input type="number" {...register('stock', { required: true, min: 0 })} />
        {errors.stock && <p>Este campo es obligatorio y debe ser un número positivo</p>}
      </label>

<label>
        <span>Nombre de la categoría:</span>
        <Controller
          name="categoryName"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field }) => (
            <select {...field} onChange={e => {
              field.onChange(e);
              setShowNewCategoryInput(e.target.value === 'Nueva categoría');
            }}>
                <option value="">Selecciona tu categoría</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          )}
        />
        {errors.categoryName && <p>Este campo es obligatorio</p>}
      </label>

      {showNewCategoryInput && (
        <label>
          <span>Nueva categoría:</span>
          <input {...register('newCategoryName', { required: true })} />
          {errors.categoryName && <p>Este campo es obligatorio</p>}
          </label>
          )}



<label>
        <span>ThemeName:</span>
        <Controller
          name="themeName"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field }) => (
            <select {...field} onChange={e => {
              field.onChange(e);
              setShowNewThemeInput(e.target.value === 'New Theme');
            }}>
                <option value="">Selecciona tu Tematica</option>
              {themes.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          )}
        />
        {errors.themeName && <p>Este campo es obligatorio</p>}
      </label>

      {showNewThemeInput && (
        <label>
          <span>Nueva Tematica:</span>
          <input {...register('newThemeName', { required: true })} />
          {errors.categoryName && <p>Este campo es obligatorio</p>}
          </label>
          )}

    

      <input type="submit" />
    </form>
    <div className={`col-md-5 d-flex justify-content-center align-items-center`}>
       <CardProductAdmin name={name} description={description} image={image} price={price} discount={discount} stock={stock}  category={!showNewCategoryInput ? categoryName : newCategoryName} theme={!showNewThemeInput ? themeName : newThemeName} />
    </div>
    </div>
    </div>
  )
}

export default FormAddProduct
