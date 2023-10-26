import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import FormCreateProfile from "./FormCreateProfile";
import style from './CustomerDetails.module.css'

function CustomerDetails(props) {
  const { currentCustomer, user, haveProfile } = props;

  return (
    <Container>
      <Row
        className={style.customerContainer}
      >
        <Col className="text-center">
          <div className={style.nameAndImage} >
        <span  className={style.nickName} >{user.nickname}</span>
          <div>
            {user.email_verified ? (
              <img
                src={user.picture}
                className="rounded-circle"
                style={{
                  width: "120%",
                  border: "solid 2px black",
                }}
              />
            ) : (
              <img
                src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.tVtxjk8PH3JeQBtIx9BeawAAAA%26pid%3DApi&f=1&ipt=effe1c246a7068857f4383e905bbba2fbf1f293b8b3bb518d7982f9c9315585c&ipo=images"
                alt={user.name}
                className="rounded-circle"
                style={{
                  width: "120px",
                  border: "solid 2px black",
                }}
              />
            )}
          </div>
          </div>
        </Col>
        <Col
        >
          <FormCreateProfile
            currentCustomer={currentCustomer}
            user={user}
            haveProfile={haveProfile}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default CustomerDetails;
