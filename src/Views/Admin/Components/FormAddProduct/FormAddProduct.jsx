import React, { useState, useEffect } from "react";
import style from "./FormAddProduct.module.css";
import CardProductAdmin from "../CardProductAdmin/CardProductAdmin";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import useAuthToken from "../../Hooks/useAuthToken";
import { useAdminStore } from "../../ZustandAdmin/AdminStore";


const FormAddProduct = () => {
  const {
    register,
    setValue,
    control,
    handleSubmit,
    watch,
    trigger,
    formState: { errors},
    reset,
  } = useForm();
 const {allCategories, allThemes, getCatgoriesAndThemes} = useAdminStore()


 useEffect(()=>{
   if(allCategories.length === 0) {
    getCatgoriesAndThemes()
   }
 },[allCategories])

 
 
  const { authToken } = useAuthToken();
  const [file, setFile] = useState(null);
  const [alert, setAlert] = useState(false);
  const [spinner, setSpinner] = useState(false);

  // Estado local para mostrar los campos de entrada
  const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);
  const [showNewThemeInput, setShowNewThemeInput] = useState(false);
  const [imagenSeleccionada, setImagenSeleccionada] = useState(null);


  const onSubmit = async (dataFrom) => {
    setSpinner(true);

    const bodyRequest = {
      name: dataFrom.name,
      description: dataFrom.description,
      price: Number(dataFrom.price),
      discount: Number(dataFrom.discount) || null,
      stock: Number(dataFrom.stock),
      categoryName: !showNewCategoryInput ? categoryName : newCategoryName,
      themeName: !showNewThemeInput ? themeName : newThemeName,
    };

    if (file) {
      try {
        const CLOUD_NAME = "dqoi2ez7t";
        const UPLOAD_PRESET = "af5ie2x7";

        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", UPLOAD_PRESET);
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`,
          data
        );
        const infoFromCloudinary = response.data;
        bodyRequest.image = infoFromCloudinary.secure_url;
      } catch (error) {
        setSpinner(false);
      }
    } else {
      bodyRequest.image = urlImagen;
    }
    const URLBACK = "https://ge3k-server.onrender.com/products/";
    try {
      const responseFronBack = await axios.post(URLBACK, bodyRequest, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setSpinner(false);
      reset();
      getCatgoriesAndThemes()
      setImagenSeleccionada(null);
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 3500);
    } catch (error) {
      setSpinner(false);
    }
  };

  // Observa los cambios en los campos del formulario
  const {
    name,
    description,
    price,
    discount,
    stock,
    categoryName,
    themeName,
    newCategoryName,
    newThemeName,
    seleccion,
    urlImagen,
  } = watch();

  const handleImageChange = (e) => {
    setFile(e.target.files[0]);
    setImagenSeleccionada(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <div className={`container-fluid`} style={{ padding: "1rem 2.4rem" }}>
      <div className={`row ${style.rowContainer}`}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={`col-md-7 ${style.AddProductForm}`}
        >
          <h4 className="text-center">NEW PRODUCT</h4>
          <label>
            <span>Name:</span>
            <input
              {...register("name", { required: true, maxLength: 100 })}
              placeholder="Mario T-Shirt"
              onChange={(e) => {
                setValue("name", e.target.value);
                trigger("name");

              }}
            />
            {errors.name && errors.name.type === "required" && (
              <span className={style.error}>This field is required</span>
            )}
            {errors.name && errors.name.type === "maxLength" && (
              <span className={style.error}>
                Name must contain a maximum of 100 characters
              </span>
            )}
          </label>

          <label>
            <span>Description:</span>
            <textarea
               rows="4"
              {...register("description", { required: true, maxLength: 250 })}
              placeholder="Mens Video Gameboy Shirt..."
              onChange={(e) => {
                setValue("description", e.target.value);
                trigger("description");

              }}
            />
            {errors.description && errors.description.type === "required" && (
              <span className={style.error}>This field is required</span>
            )}
            {errors.description && errors.description.type === "maxLength" && (
              <span className={style.error}>Description must contain a maximum of 250 characters</span>
            )}
          </label>

          <label>
            <span>Image:</span>
            <Controller
              name="seleccion"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <select
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    setImagenSeleccionada(null);
                    setFile(null);
                  }}
                >
                  <option value="">Upload a image product</option>
                  <option value="url">URL</option>
                  <option value="local">Upload local image</option>
                  
                </select>
              )}
            />
            {errors.seleccion && (
              <span className={style.error}>This field is required</span>
            )}
          </label>

          {seleccion === "url" && (
            <label>
              {" "}
              <input
                name="urlImagen"
                {...register("urlImagen", { required: true })}
                placeholder="Ingresa la URL de la imagen"
                onChange={(e) => {
                  setValue("urlImagen", e.target.value);
                  trigger("urlImagen");
  
                }}
                
              />
               {errors.urlImagen && (
              <span className={style.error}>This field is required</span>
            )}
            </label>
          )}

          {seleccion === "local" && (
            <label>
              {" "}
              <input
                type="file"
                name="imagenLocal"
                {...register("imagenLocal", { required: true })}
                onChange={handleImageChange}
              />
            </label>
          )}

          <label>
            <span>Price:</span>
            <input
              type="number"
              min="0"
              {...register("price", { required: true, min: 0 })}
              placeholder="0"
              step="any"
              onChange={(e) => {
                setValue("price", e.target.value);
                trigger("price");

              }}
              onKeyPress={(event) => {
                if (event.key === '-' || event.key === '+') {
                  event.preventDefault();
                }
              }
            }
            />
            {errors.price && errors.price.type === 'required' && (
              <span className={style.error}>
                This field is required
              </span>
            )}
            {errors.price && errors.price.type === 'min' && (
              <span className={style.error}>
                The price must be at least 0
              </span>
            )}
          </label>

          <label>
            <span>Discount:</span>
            <input
              type="number"
              min="0"
              max="99"
              defaultValue= "0"
              {...register("discount", { min: 0, max: 99,   })}
              onChange={(e) => {
                setValue("discount", e.target.value);
                trigger("discount");

              }}
              onKeyPress={(event) => {
                if (event.key === '-' || event.key === '+') {
                  event.preventDefault();
                }
              }
            }
            />
            {errors.discount && (
              <span className={style.error}>
                Discount must be a number between 0 and 99
              </span>
            )}
          </label>

          <label>
            <span>Stock:</span>
            <input
              type="number" min="1"
              {...register("stock", { required: true, min: 1 })}
              placeholder="15"
              onChange={(e) => {
                setValue("stock", e.target.value);
                trigger("stock");

              }}
              onKeyPress={(event) => {
                if (event.key === '-' || event.key === '+') {
                  event.preventDefault();
                }
              }
            }
            />
            {errors.stock && (
              <span className={style.error}>
                 Stock must be at least 1
              </span>
            )}
          </label>

          <label>
            <span>Category:</span>
            <Controller
              name="categoryName"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <select
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    setShowNewCategoryInput(e.target.value === "New category");
                  }}
                >
                  <option value="">Select a category</option>
                  {allCategories && [...allCategories, {name:"New category"}].map((category) => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              )}
            />
            {errors.categoryName && (
              <span className={style.error}>This field is required</span>
            )}
          </label>

          {showNewCategoryInput && (
            <label>
              <span>New Category:</span>
              <input {...register("newCategoryName", { required: true })} />
              {errors.categoryName && (
                <span className={style.error}>This field is required</span>
              )}
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
                <select
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    setShowNewThemeInput(e.target.value === "New Theme");
                  }}
                >
                  <option value="">Select a theme</option>
                  {allThemes && [...allThemes, {name:"New Theme"}].map((themas) => (
                    <option key={themas.id} value={themas.name}>
                      {themas.name}
                    </option>
                  ))}
                </select>
              )}
            />
            {errors.themeName && <span className={style.error}>This field is required</span>}
          </label>

          {showNewThemeInput && (
            <label>
              <span>New Theme:</span>
              <input {...register("newThemeName", { required: true })} />
              {errors.categoryName && <span className={style.error}>This field is required</span>}
            </label>
          )}

          <button>
            {!spinner ? (
              "Create new product"
            ) : (
              <Spinner animation="border" variant="light" />
            )}
          </button>
        </form>
        <div
          className={`col-md-5 d-flex flex-column justify-content-center align-items-center`}
        >
          <CardProductAdmin
            name={name}
            description={description}
            image={imagenSeleccionada ? imagenSeleccionada : urlImagen}
            price={price}
            discount={discount}
            stock={stock}
            category={!showNewCategoryInput ? categoryName : newCategoryName}
            theme={!showNewThemeInput ? themeName : newThemeName}
          />
          {alert && (
            <div className="col-12 mt-2">
              <Alert key="success" variant="success">
                Product created successfully!
              </Alert>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormAddProduct;
