import React, { useEffect, useState } from "react";
import { customerStore } from "../../zustand/customerStore/customerStore";
import { Button } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";

const PurchaseOrder = () => {
  const selectedProducts = [
    {
      id: "0552d9dc-3def-4e4b-946f-d82e1daeb9a1",
      name: "World of Warcraft T-Shirt",
      price: "11.00",
      image:
        "https://res.cloudinary.com/dqoi2ez7t/image/upload/b_rgb:ffffff,c_pad,h_500,w_500/v1696188929/GeekHub%20Products/61PIC7zpqKL._AC_UY550__gdzvvp.jpg",
      description:
        "JINX World of Warcraft: Legion Logo Men's Gamer Graphic T-Shirt",
      stock: 15,
      discount: null,
      categoryName: "T-shirts",
      themeName: "Video Games",
      quantity: "1",
    },
    {
      id: "8440fd70-4d41-47e2-ae96-60640f21e450",
      name: "Vegeta T-Shirt",
      price: "12.00",
      image:
        "https://res.cloudinary.com/dqoi2ez7t/image/upload/b_rgb:ffffff,c_pad,h_500,w_500/v1696188948/GeekHub%20Products/71bSuYq1gfL._AC_UX569__uocug3.jpg",
      description:
        "Legends are Born in July - Vegeta - T-Shirt - Comfortable Fit",
      stock: 15,
      discount: null,
      categoryName: "T-shirts",
      themeName: "Anime",
      quantity: "1",
    },
    {
      id: "f31c442a-938e-4995-91fb-8369cb3723e9",
      name: "Funny Hacker T-Shirt",
      price: "19.99",
      image:
        "https://res.cloudinary.com/dqoi2ez7t/image/upload/b_rgb:ffffff,c_pad,h_500,w_500/v1696188969/GeekHub%20Products/61wB_IDPF0L._AC_UX522__roylui.jpg",
      description: "Kings Of NY Hacker Computer Programmer Mens T-Shirt",
      stock: 15,
      discount: null,
      categoryName: "T-shirts",
      themeName: "Programming",
      quantity: "1",
    },
  ];
  const { user, isAuthenticated } = useAuth0();

  const [userData, setUserData] = useState({
    name: "",
    surname: "",
    birthdate: "",
    email: "",
    address: "",
    phone: "",
  });

  useEffect(() => {
    if (isAuthenticated && user) {
      setUserData({
        name: user.name,
        email: user.email,
        surname: user.surname,
        birthdate: user.birthdate,
        address: user.address,
      });
    }
  }, [isAuthenticated, user]);

  return (
    <div className="mx-5 mt-5 mb-5">
      <div className="row">
        <div className=" col-md-7 mx-5 mb-5">
          <h1
            className="text-center"
            style={{ color: "#FC6522", marginBottom: "40px" }}
          >
            Confirmation of data for purchase
          </h1>
          <form>
            <div className="row">
              <div className="col-md-6 mb-4">
                <label
                  for="name"
                  className="form-label"
                  style={{ fontWeight: "700" }}
                >
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Name"
                  value={userData.name}
                  onChange={(e) =>
                    setUserData({ ...userData, name: e.target.value })
                  }
                ></input>
              </div>

              <div className="col-md-6 mb-4">
                <label
                  for="surname"
                  className="form-label"
                  style={{ fontWeight: "700" }}
                >
                  Surname
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="surname"
                  placeholder="Surname"
                  value={userData.surname}
                  onChange={(e) =>
                    setUserData({ ...userData, surname: e.target.value })
                  }
                ></input>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-4">
                <label
                  for="birthdate"
                  className="form-label"
                  style={{ fontWeight: "700" }}
                >
                  Birthdate
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="birthdate"
                ></input>
              </div>
              <div className="col-md-6 mb-4">
                <label
                  for="phone"
                  className="form-label"
                  style={{ fontWeight: "700" }}
                  value={userData.birthdate}
                  onChange={(e) =>
                    setUserData({ ...userData, birthdate: e.target.value })
                  }
                >
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Email"
                  value={userData.email}
                  onChange={(e) =>
                    setUserData({ ...userData, email: e.target.value })
                  }
                ></input>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mb-4">
                <label
                  for="address"
                  className="form-label"
                  style={{ fontWeight: "700" }}
                >
                  Address
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  placeholder="Address"
                  value={userData.address}
                  onChange={(e) =>
                    setUserData({ ...userData, address: e.target.value })
                  }
                ></input>
              </div>

              <div className="col-md-6 mb-4">
                <label
                  for="phone"
                  className="form-label"
                  style={{ fontWeight: "700" }}
                >
                  Phone
                </label>
                <input
                  type="tel"
                  className="form-control"
                  id="phone"
                  placeholder="Phone"
                  value={userData.phone}
                  onChange={(e) =>
                    setUserData({ ...userData, phone: e.target.value })
                  }
                ></input>
              </div>
            </div>
          </form>
        </div>
        <div className="card col-md-3 mx-5">
          <h2 className="text-center mt-3">Purchase detail</h2>
          <div className="colunm ">
            {selectedProducts.map((product) => (
              <div key={product.id} className="col-md-10 mb-2 mx-auto">
                <div className="card">
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <img
                      src={product.image}
                      alt="image"
                      className=""
                      style={{
                        width: "30px",
                        height: "30px",
                        marginRight: "10px",
                        marginLeft: "10px",
                      }}
                    />
                    <div
                      style={{
                        marginLeft: "10px",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <h5
                        style={{
                          fontSize: "12px",
                          marginBottom: "5px",
                          marginTop: "10px",
                          color: "#FC6522",
                          fontWeight: "bold",
                        }}
                      >
                        {product.name}
                      </h5>
                      <p style={{ fontSize: "12px" }}>
                        Price: ${product.price}
                      </p>
                      <p style={{ fontSize: "12px", fontWeight: "700" }}>
                        Quantity: {product.quantity}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: "15px", fontWeight: "500", marginTop: "10px" }}>
            Total quantity: 3
          </p>
          <hr />
          <div className="d-flex justify-content-between">
            <h3>Total:</h3>
            <p
              style={{
                fontSize: "20px",
                fontWeight: "700",
                marginBottom: "100px",
              }}
            >
              $42.99
            </p>
          </div>
          <Button
            className="btn btn-primary mb-3"
            style={{
              width: "300px",
              backgroundColor: "#FC6522",
              borderColor: "#ff6824",
              color: "white",
              borderRadius: "30px",
              fontWeight: "500",
            }}
          >
            Purchase confirmation
          </Button>
          <Button
            className="btn btn-primary mb-3"
            style={{
              width: "300px",
              backgroundColor: "#FC6522",
              borderColor: "#ff6824",
              color: "white",
              borderRadius: "30px",
              fontWeight: "500",
            }}
          >
            Return to cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PurchaseOrder;
