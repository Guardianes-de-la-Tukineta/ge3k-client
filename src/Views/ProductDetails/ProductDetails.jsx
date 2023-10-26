import React, { useEffect, useState } from "react";
import styles from "./ProductDetails.module.css";
import { useParams } from "react-router-dom";
import { Container, Col, Row, Button } from "react-bootstrap";
import { useStore } from "../../zustand/useStore/useStore";
import { Link } from "react-router-dom";
import { cartStore } from "../../zustand/cartStore/cartStore";
import { useAuth0 } from "@auth0/auth0-react";
import { customerStore } from "../../zustand/customerStore/customerStore";
import Spinner from "react-bootstrap/Spinner";
import { favoriteStore } from "../../zustand/favoriteStore/favoriteStore";
import ReactStars from 'react-stars';
import FormRating from "../../components/FormRating/FormRating";
import Swal from 'sweetalert2'

//HP el componente de llama ProductDetails  ya que podemos tener otros details ej, RatingDetails
function ProductDetails() {
  const { id } = useParams();
  const { getProductsDetails, productDetails, deletePorductDetail, deleteRatingProduct } = useStore(); // Utiliza el hook useStore para acceder al estado y a la función getProductsDetails
  const { addProductToCart } = cartStore(); //cart store de zustand
  const { isAuthenticated } = useAuth0(); // para saber si estoy logueado
  const { currentCustomer } = customerStore();
  const { favorites, addProductFavorite, deleteProductFavorite, updateLocalStorage } = favoriteStore()
  const [isFav, setIsFav] = useState(false); // para cambiar el estado de fav y no fav
  const [isFavDisabled, setIsFavDisabled] = useState(false); // para deshabilitar momentaneamente el boton de fav
  const [showFormRating, setShowFormRating] = useState({
    state: false,
    edit: false
  })
  const [promedioRating, setPromedioRating] = useState(0)
  const { loginWithRedirect } = useAuth0(); // para loguearnos
  const [comments, setComments] = useState(0); // solo para guardar el momento q añadimos o editamos cometario y renderizar de nuevo automaticamente
  const [reviewSelected, setReviewSelected] = useState('')
  const [disabledButtonWrite, setDisabledButtonWrite] = useState(false) // para deshabilitar el boton de write un comentario si el user ya escribió uno

  useEffect(() => {
    const fetchData = async () => {
      await getProductsDetails(id); // Obtiene los nuevos detalles del producto      
    };
    setTimeout(()=>{
      fetchData();
    },1500)
    setShowFormRating({
      state: false,
      edit: false
    })
    setComments('') // limpiaos para q se renderice cada q modifiquemos o añadamos comentario
    return () => {
      deletePorductDetail() //limpiar el deteail cuando se desmonta el componente
    }
  }, [id, comments]);

  useEffect(() => { // la info de productDetails se demora unos segundos, por eso cuando le llegue la info se renderiza el corazon
    updateLocalStorage(favorites)
    if (productDetails.id && favorites.findIndex((elem) => elem.id === productDetails.id) !== -1) { //si esta en favoritos pintamos el corazon       
      setIsFav(true)
    }
    if (productDetails.Ratings && productDetails.Ratings.length > 0) {
      const promedioRat = (productDetails.Ratings.reduce((a, b) => a + b.rating, 0)) / productDetails.Ratings.length
      setPromedioRating(promedioRat)
      productDetails.Ratings.map((elem)=>{
        if(currentCustomer.id === elem.CustomerId)setDisabledButtonWrite(true)
        else setDisabledButtonWrite(false)
      })
    }
    console.log(currentCustomer);    
  }, [favorites, productDetails, promedioRating, setComments, comments]);

  // const productDetail = useSelector((state) => state.detail);
  const buttonStyle = {
    backgroundColor: "#ff6824",
    borderColor: "#ff6824",
    color: "black",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: '5px',
    paddingRight: "15px",
    fontWeight: "500",
    borderRadius: "10px",
    height: '44px'
  };

  //handlers
  const handlerAddToCart = () => {
    addProductToCart(
      isAuthenticated || false,
      currentCustomer.id,
      productDetails
    );
  };
  const handlerIsFav = () => {
    if (isFavDisabled) { //evita q el user haga click dos veces seguidas al fav sin dar tiempo de procesar en back
      return;
    }
    setIsFavDisabled(true);
    if (!isFav) { //si no esta en favoritos ya      
      addProductFavorite(isAuthenticated, currentCustomer.id, productDetails)
      setIsFav(true)
    } else {
      deleteProductFavorite(isAuthenticated, currentCustomer.id, productDetails.id)
      setIsFav(false)
    }
    // Habilitar el botón después de 1 seg
    setTimeout(() => {
      setIsFavDisabled(false);
    }, 1000);
  }
  const handlerWriteReview = () => { //mostrar form para valorar producto, solo si esta logueado
    if (isAuthenticated) {
      if(disabledButtonWrite){ //si ya tenemos un comentario nuestro, mandamos alerta
        Swal.fire({
          position: 'center',
          icon:'error',
          title:'You already have an opinion about this product',
          showConfirmButton: true, 
          allowOutsideClick: false,
          confirmButtonColor: '#ff6824',                
      })
      } else {
        setShowFormRating({
          state: true,
          edit: false
        })
      }
    } else {
      Swal.fire({    //modal    
        icon: 'warning',
        title:
          'you must <b>log in</b> to be able to leave a comment',
        showCloseButton: true,        
        focusConfirm: false,
        confirmButtonText:
          '<i class="fa fa-thumbs-up"></i> Login!',        
        confirmButtonColor: '#ff6824',      
      }).then((result) => {
        if (result.isConfirmed) {
          loginWithRedirect()
        }
      })
    }
  }  
  const handleEditComment = (prevComment) => {
    setShowFormRating({
      state: true,
      edit: true,
      prevComment
    })
  }

  const handleDeleteRating = async (ratingId) => {
    try {
      await deleteRatingProduct(isAuthenticated, currentCustomer.id, ratingId)
      setComments('update')
      Swal.fire({
        position: 'center',
        icon:'success',
        title:'your comment was deleted successfully',
        showConfirmButton: false, 
        allowOutsideClick: false,
        timer:2000              
    }) 
    } catch (error) {
      console.error(error)
    }
  }


  const maxCaracterByLine = 230; // Define la longitud máxima en caracteres por línea

  // Función para contar las líneas de un texto en función de la longitud
  const linesCounter = (texto) => {
    const lines = texto.split('\n'); // Divide el texto por saltos de línea   
    let lineasExcedidas = 0;
    lines.forEach((line) => {
      if (line.length > maxCaracterByLine) {
        lineasExcedidas += Math.ceil(line.length / maxCaracterByLine);
      }
    });    
    return lineasExcedidas;
  };

  //Para transformar los saltos de linea en array de parrafos
  function splitTextIntoParagraphs(text) {
    return text.split('\n').filter(paragraph => paragraph.trim() !== '');
  }


  // Genera avatares aleatorios en base a las iniciales del nombre
  function userAvatar(name) {
    const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`;

    return avatarUrl;
  }

  return (
    <Container className={styles.productDetailsConteiner}>
      {!productDetails.image ? ( //controlo que el estado ya tenga la propiedad imagen
        <Row style={{ padding: "100px", justifyContent: "center" }}>
          <Spinner
            style={{ padding: "100px" }}
            animation="border"
            variant="dark"
          />
        </Row>
      ) : (
        <Row className="mt-4" style={{ marginBottom: '3rem' }}>
          <Col>
            <img
              className={styles.image}
              src={productDetails.image}
              alt={productDetails.name}
            />
          </Col>
          <Col className={styles.dataProduct}>
            <div className={styles.dataContainer}>
              <h1 className={styles.title}>{productDetails.name}</h1>
              <h3 className={styles.stock}>{productDetails.description}</h3>
              {/* HP. muestro el descuento solo si el producto lo tiene */}
              {productDetails.discount === null || productDetails.discount === 0 ? (
                <h2 className={styles.Price}>Price ${productDetails.price}</h2>
              ) : (
                <>
                  <h2 className={styles.oldPrice}>
                    Price U$S {productDetails.price}
                  </h2>
                  <h2 className={styles.price}>
                    Off $
                    {productDetails.price -
                      productDetails.price * (productDetails.discount / 100)}
                  </h2>
                </>
              )}
              <h2 className={styles.stock}>In stock: {productDetails.stock} </h2>
              {/* <h2 className={styles.info}>ID: {id}</h2> */}

              <h2 className={styles.info}>
                Category:{" "}
                <Link
                  to={"/category/" + productDetails.Category.name}
                  className={styles.detailsLink}
                >
                  {productDetails.Category.name}
                </Link>
              </h2>

              <h2 className={styles.info}>
                Thematic:{" "}
                <Link
                  to={"/thematic/" + productDetails.Theme.name}
                  className={styles.detailsLink}
                >
                  {productDetails.Theme.name}
                </Link>
              </h2>
            </div>
            <div className={styles.buttonSection}>
              <Button onClick={() => handlerAddToCart()} style={buttonStyle}>
                <i
                  className="bi bi-cart4"
                  style={{ color: "black", fontSize: "1.2rem", padding: "5px" }}
                ></i>{" "}

                <span>Add to cart</span>
              </Button >
              {/* HP muestro el corazon que corresponda si es favorito o no */}
              <button style={{ border: "none", backgroundColor: "transparent" }} onClick={() => handlerIsFav()}>
                {
                  !isFav ? <i style={{ color: "red", fontSize: "1.4rem" }} className="bi bi-suit-heart "></i>
                    : <i style={{ color: "red", fontSize: "1.4rem" }} className="bi bi-suit-heart-fill"></i> //para traer el icono de corazon lleno o vació
                }
              </button>
            </div>
          </Col>
        </Row>
      )}
      <hr></hr>
      <div className={`d-flex row  ${styles.containerReviews}`}>
        <div className={`col-md-4  ${showFormRating.state && styles.blurBackground}`}>
          <div>
            <h3>Customer reviews</h3>
            <div className="d-flex">
              <ReactStars
                count={5}
                value={promedioRating} // Establece el valor de las estrellas 
                edit={false} // Deshabilita la interacción del usuario               
                size={24}
                color2={'#ffd700'}
              />
              <p className="mt-2">[{promedioRating}]</p>
            </div>
          </div>
          <hr></hr>
          <div>
            <h3>Review this product</h3>
            Share your thoughts with other customers
            {
              
            }
            <button onClick={() => handlerWriteReview()} className="btn btn-dark mt-3">Write a customer review</button>
          </div>
        </div>

        <div className={`col-md-8  ${showFormRating.state && styles.blurBackground} `}>
          <h3>Top reviews </h3>
          {
            productDetails.Ratings && productDetails.Ratings.length > 0 && productDetails.Ratings.map((elem) => {

              let dateBack = new Date(elem.createdAt);
              let dateFormated = dateBack.toLocaleDateString();              

              return (
                <div className={`media ${styles.commentContainer}`} key={elem.id}>
                  {/* <img src="imagen-usuario.jpg" className="mr-3" alt="..." style={{ width: "64px", height: "64px"}}/> */}
                  <div className="media-body">
                    <div className={styles.header}>
                      <div className={styles.headerDescription}>
                        <div
                          className={styles.imagenUsuario}
                          style={{
                            backgroundImage: `url(${userAvatar(elem.Customer.name)})`,
                          }}
                        ></div>
                        <span className={styles.customerName}>{elem.Customer.name} </span>
                      </div>

                      <div className={styles.headerDescription}>
                        {isAuthenticated && currentCustomer.id === elem.CustomerId && (
                          <button
                            className={`btn btn-dark ${styles.editButton}`}
                            onClick={() => handleEditComment(elem.Comment)}
                          > Edit
                            <i className="bi bi-pencil-square"></i>
                          </button>
                        )}
                        {isAuthenticated && currentCustomer.id === elem.CustomerId && (
                          <button
                            className={`btn btn-dark ${styles.deleteButton}`}
                            onClick={() => handleDeleteRating(elem.id)}
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        )}
                      </div>
                    </div>
                    <ReactStars
                      count={5}
                      value={elem.rating} // Establece el valor de las estrellas
                      edit={false} // Deshabilita la interacción del usuario
                      size={24}
                      color2={"#ffd700"}
                      className={styles.stars}
                    />
                    <div className={styles.date} >Reviewed on {dateFormated} </div>
                    <div className={(reviewSelected !== elem.id) ? styles.descritionComment : styles.descritionCommentMore}>{splitTextIntoParagraphs(elem.Comment).map((paragraph, index) => (<p key={index} >
                      {paragraph}
                    </p>))}
                    </div>

                    {linesCounter(elem.Comment) > 1 && <div>
                      {(reviewSelected === elem.id) ? <button
                        className={`btn btn-dark ${styles.seeMore}`}
                        onClick={() => setReviewSelected('')}
                      >  See less
                        <i className="bi bi-chevron-compact-up"></i>
                      </button> : <button
                        className={`btn btn-dark ${styles.seeMore}`}
                        onClick={() => setReviewSelected(elem.id)}
                      >  See more
                        <i className="bi bi-chevron-compact-down"></i>
                      </button>}
                    </div>}

                  </div>
                </div>
              );
            })
          }
        </div>
        {
          showFormRating.state && <FormRating ProductId={productDetails.id} showFormRating={showFormRating} setShowFormRating={setShowFormRating} setComments={setComments} prevComment={(showFormRating.edit) ? showFormRating.prevComment : false} />
        }
      </div>
    </Container>
  );
}

export default ProductDetails;
