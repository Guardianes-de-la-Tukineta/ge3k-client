import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Container, Row, Col } from "react-bootstrap";

function FormUpdateProfile(props) {
  const { currentCustomer, user } = props;
  const [editing, setEditing] = useState(false);
  const [updatedCustomer, setUpdatedCustomer] = useState({
    ...currentCustomer,
  });

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSaveClick = () => {
    alert(JSON.stringify(updatedCustomer));
    setEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedCustomer({
      ...updatedCustomer,
      [name]: value,
    });
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1> {user.nickname}</h1>
          <div width={"250px"}>
            {user.email_verified ? (
              <img src={user.picture} />
            ) : (
              <img
                src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.tVtxjk8PH3JeQBtIx9BeawAAAA%26pid%3DApi&f=1&ipt=effe1c246a7068857f4383e905bbba2fbf1f293b8b3bb518d7982f9c9315585c&ipo=images"
                alt="updatedCustomer.name"
              />
            )}
          </div>
        </Col>
        <Col>
          {editing ? (
            <>
              <div>
                <Form>
                  <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={updatedCustomer.name}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="surname">
                    <Form.Label>Surname</Form.Label>
                    <Form.Control
                      type="text"
                      name="surname"
                      value={updatedCustomer.surname}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="birthdate">
                    <Form.Label>Birthdate</Form.Label>
                    <Form.Control
                      type="text"
                      name="birthdate"
                      value={updatedCustomer.birthdate}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="text"
                      name="email"
                      value={updatedCustomer.email}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="phone">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                      type="text"
                      name="phone"
                      value={updatedCustomer.phone}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="address">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      type="text"
                      name="address"
                      value={updatedCustomer.address}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                </Form>
              </div>
            </>
          ) : (
            <>
              <p>Name: {currentCustomer.name}</p>
              <p>Surname: {currentCustomer.surname}</p>
              <p>Email: {currentCustomer.email}</p>
              <p>Birthdate: {currentCustomer.birthdate}</p>
              <p>Phone: {currentCustomer.phone}</p>
              <p>Address: {currentCustomer.address}</p>
            </>
          )}

          {editing ? (
            <Button variant="primary" onClick={handleSaveClick}>
              Save
            </Button>
          ) : (
            <Button variant="info" onClick={handleEditClick}>
              Edit
            </Button>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default FormUpdateProfile;
