import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import FormCreateProfile from "./FormCreateProfile";

function CustomerDetails(props) {
  const { currentCustomer, user, haveProfile } = props;

  return (
    <Container>
      <Row
        style={{
          //   backgroundColor: "#dee2e6",
          //   border: "2px black solid",
          borderRadius: "10px",
          padding: "10px",
          margin: "10px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Col className="text-center">
          <h1>{user.nickname}</h1>
          <div>
            {user.email_verified ? (
              <img
                src={user.picture}
                className="rounded-circle"
                style={{
                  maxWidth: "200px",
                  width: "100%",
                  border: "solid 5px orangered",
                }}
              />
            ) : (
              <img
                src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.tVtxjk8PH3JeQBtIx9BeawAAAA%26pid%3DApi&f=1&ipt=effe1c246a7068857f4383e905bbba2fbf1f293b8b3bb518d7982f9c9315585c&ipo=images"
                alt={user.name}
                className="rounded-circle"
                style={{
                  maxWidth: "200px",
                  width: "100%",
                  border: "solid 5px orangered",
                }}
              />
            )}
          </div>
        </Col>
        <Col
          style={{
            // backgroundColor: "#dee2e6",
            border: "2px black solid",
            borderRadius: "10px",
            padding: "10px",
            margin: "10px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <FormCreateProfile
            currentCustomer={currentCustomer}
            user={user}
            haveProfile={haveProfile}
          />
          {/* <h2>create profile</h2> */}
        </Col>
      </Row>
    </Container>
  );
}

export default CustomerDetails;
