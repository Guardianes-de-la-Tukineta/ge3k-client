import React, {useState} from 'react'
import style from './FormAddProduct.module.css'
import CardProductAdmin from '../CardProductAdmin/CardProductAdmin'
import { useForm, Controller  } from 'react-hook-form';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';


const FormAddProduct = () => {

    const { register, control, handleSubmit, watch, formState: { errors }, reset } = useForm();
    const [file, setFile] = useState(null)
    const [alert, setAlert] = useState(false)
    const [spinner, setSpinner] = useState(false)

         // Estado local para mostrar los campos de entrada
  const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);
  const [showNewThemeInput, setShowNewThemeInput] = useState(false);
  const [imagenSeleccionada, setImagenSeleccionada] = useState(null);

    const onSubmit = async (dataFrom) => {

      setSpinner(true)

      const bodyRequest = {
        name: dataFrom.name,
        description: dataFrom.description,
        price: Number(dataFrom.price),
        discount: Number(dataFrom.discount) || null,
        stock: Number(dataFrom.stock),
        categoryName: !showNewCategoryInput ? categoryName : newCategoryName,
        themeName: !showNewThemeInput ? themeName : newThemeName,
      }
    
  if(file){  try {
      const CLOUD_NAME = "dqoi2ez7t"
      const UPLOAD_PRESET = "af5ie2x7"

      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", UPLOAD_PRESET );
      const response = await axios.post(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`,
      data)
      const infoFromCloudinary = response.data
      bodyRequest.image = infoFromCloudinary.secure_url
   
    } catch (error) {
      setSpinner(false)
      console.log(error.response.data.error)
    }}else{
      bodyRequest.image = urlImagen;
    }

    const URLBACK = 'https://ge3k-server.onrender.com/products/'
    try {
      const responseFronBack = await axios.post(URLBACK,bodyRequest)
      const dataFromBack = responseFronBack.data
      setSpinner(false)
      reset() 
      setImagenSeleccionada(null)
      setAlert(true)
      setTimeout(()=>{ setAlert(false)},3500)
    } catch (error) {
      setSpinner(false)
      console.log(error.response.data)
    }



    };
  
    // Observa los cambios en los campos del formulario
    const {name, description, price, discount, stock, categoryName, themeName, newCategoryName, newThemeName,seleccion, urlImagen } = watch();
    const watchAllFields = watch();


     // Tus opciones para categoryName y themeName
  const categories = ['T-shirts', 'Mugs', 'PC Accesories', 'Collectible figures', 'New category'];
  const themes = ['Video Games', 'Programming', 'Anime', 'Gaming', 'New Theme'];




  const handleImageChange = (e) => {
    setFile(e.target.files[0])
    setImagenSeleccionada(URL.createObjectURL(e.target.files[0]));
  };



  return (
    <div className={`container-fluid`} style={{padding:'1rem 2.4rem'}}>
<div className={`row ${style.rowContainer}`}>

       

    <form onSubmit={handleSubmit(onSubmit)} className={`col-md-7 ${style.AddProductForm}`}>
      <h4 className='text-center'>NEW PRODUCT</h4>
      <label>
        <span>Name:</span>
        <input {...register('name', { required: true, maxLength: 100 })}  placeholder='Mario T-Shirt'/>
        {errors.name && <span className={style.error}>This field is required</span>}
      </label>

      <label>
        <span>Description:</span>
        <input {...register('description', { required: true, maxLength: 500 })} placeholder='Mens Video Gameboy Shirt...'/>
        {errors.description && <span className={style.error}>This field is required</span>}
      </label>

      <label>
        <span>Image:</span>
        <Controller
        name="seleccion"
        control={control}
        defaultValue=""
        rules={{ required: true }}
        render={({ field }) => (
          <select {...field} onChange={(e) => {
            field.onChange(e);
            setImagenSeleccionada(null);
            setFile(null)
          }}>
            <option value="">Image type</option>
            <option value="url">URL</option>
            <option value="local">Upload local image</option>
          </select>
        )}
      />
        {errors.seleccion && <span className={style.error}>This field is required</span>}
        </label>

    
   
      {seleccion === 'url' && (
          <label> <input name="urlImagen" {...register('urlImagen', { required: true })} placeholder="Ingresa la URL de la imagen" /></label>
      )}



      {seleccion === 'local' && (
       <label> <input type="file" name="imagenLocal" {...register('imagenLocal', { required: true })} onChange={handleImageChange} /> </label>
      )}
     

      <label>
        <span>Price:</span>
        <input type="number" {...register('price', { required: true, min: 0 })} placeholder='0' step="any"/>
        {errors.price && <span className={style.error}>This field is required and must be a positive number</span>}
      </label>

   

      <label>
        <span>Discount:</span>
        <input type="number" {...register('discount', { min: 0 })} />
        {errors.discount && <span className={style.error}>This field must be a positive number or zero</span>}
      </label>

      <label>
        <span>Stock:</span>
        <input type="number" {...register('stock', { required: true, min: 0 })} placeholder='0'/>
        {errors.stock && <span className={style.error}>This field is required and must be a positive number</span>}
      </label>

<label>
        <span>Category:</span>
        <Controller
          name="categoryName"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field }) => (
            <select {...field} onChange={e => {
              field.onChange(e);
              setShowNewCategoryInput(e.target.value === 'New category');
            }}>
                <option value="">Select a category</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          )}
        />
        {errors.categoryName && <span className={style.error}>This field is required</span>}
      </label>

      {showNewCategoryInput && (
        <label>
          <span>New Category:</span>
          <input {...register('newCategoryName', { required: true })} />
          {errors.categoryName && <span className={style.error}>This field is required</span>}
          </label>
          )}



<label>
        <span>Theme:</span>
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
                <option value="">Select a theme</option>
              {themes.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          )}
        />
        {errors.themeName && <p>This field is required</p>}
      </label>

      {showNewThemeInput && (
        <label>
          <span>New Theme:</span>
          <input {...register('newThemeName', { required: true })} />
          {errors.categoryName && <p>This field is required</p>}
          </label>
          )}

    

   
      <button>{(!spinner) ? 'Create new product':  <Spinner animation="border" variant="light" />}</button>
    </form>
    <div className={`col-md-5 d-flex flex-column justify-content-center align-items-center`}>
       <CardProductAdmin name={name} description={description} image={(imagenSeleccionada) ? imagenSeleccionada : urlImagen} price={price} discount={discount} stock={stock}  category={!showNewCategoryInput ? categoryName : newCategoryName} theme={!showNewThemeInput ? themeName : newThemeName} />
       {(alert) &&
          <div className='col-12 mt-2'>
          <Alert key='success' variant='success'>
          Product created successfully!
        </Alert>
          </div>}
    </div>
    
    </div>
    </div>
  )
}

export default FormAddProduct
