import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./TeemLading.module.css";

const TeamLanding = () => {
  const teamData = [
    {
      name: "Paola",
      surname: "Poveda",
      linkedin:
        "https://www.linkedin.com/in/sandra-paola-poveda-marulanda-11285083/",
      country: "Colombia",
      img: "https://avatars.githubusercontent.com/u/121766472?v=4",
    },
    {
      name: "Cristian",
      surname: "Guzman",
      linkedin: "https://www.linkedin.com/in/cristian-guzman-bb5867233/",
      country: "Colombia",
      img: "https://avatars.githubusercontent.com/u/97709449?v=4",
    },
    {
      name: "Juan Pablo",
      surname: "Accinelli",
      linkedin: "https://www.linkedin.com/in/juan-pablo-accinelli/",
      img: "https://avatars.githubusercontent.com/u/95284913?v=4",
      country: "Argentina",
    },
    {
      name: "Hernan",
      surname: "Parino",
      linkedin: "https://www.linkedin.com/in/hernan-parino/",
      country: "Argentina",
      img: "https://avatars.githubusercontent.com/u/126422711?v=4",
    },
    {
      name: "Sebastian",
      surname: "Masaguer",
      linkedin:
        "https://www.linkedin.com/feed/update/urn:li:activity:7112750001306398720/",
      country: "Argentina",
      img: "https://media.licdn.com/dms/image/D4D03AQF6Ztw5oEoJjg/profile-displayphoto-shrink_200_200/0/1689259627497?e=1703721600&v=beta&t=M5N79Jtp0s02W64OqQFi_Ygpo8V_o-ydHE0iC5XC6xA",
    },
    {
      name: "Kevin",
      surname: "Salom",
      linkedin: "https://www.linkedin.com/in/kevin-salom-465aa2154/",
      country: "Venezuela",
      img: "https://avatars.githubusercontent.com/u/110046462?v=4",
    },
    {
      name: "Leonardo",
      surname: "Villarraga",
      linkedin: "https://www.linkedin.com/in/leonardo-villarraga-b3941b190/",
      country: "Colombia",
      img: "https://avatars.githubusercontent.com/u/113633263?v=4",
    },
    {
      name: "Nelson",
      surname: "Martino",
      linkedin: "https://www.linkedin.com/in/nelsonmartino/",
      country: "Argentina",
      img: "https://media.licdn.com/dms/image/C4D03AQHwcK1FxuVUdg/profile-displayphoto-shrink_200_200/0/1659354465575?e=1703721600&v=beta&t=XZck4Hm-yhPxRcK5SZjw89QklpellnWK-8nG3XcpXfM",
    },
  ];
  // Función para mezclar aleatoriamente el equipo
  const shuffleTeam = (array) => {
    let shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  const team = shuffleTeam(teamData);

  return (
    <Container
      fluid
      style={{
        backgroundColor: "#f2f2f2",
        padding: "5rem",
        paddingBottom: "0em",
      }}
    >
      <div
        // style={{
        //   backgroundColor: "#f2f2f2",
        //   padding: "3em",
        //   paddingBottom: "0em",
        //   paddingTop: "2em",
        // }}
        className={styles.header}
      >
        <div className={styles.icon}>
          <i className="bi bi-person-fill"></i>
        </div>

        <h2>Our Development Team</h2>

        <p style={{ fontSize: "1.2rem", maxWidth: "750px" }}>
          We are a passionate team of developers and technology enthusiasts.
          Each member brings a unique combination of technical skills and
          creativity, allowing us to tackle challenges innovatively and deliver
          exceptional solutions.
        </p>
      </div>
      <Row className={styles.personContainer}>
        {team.map((member, index) => (
          <Col
            style={{
              paddingBottom: "2em",
            }}
            key={index}
            md={3}
          >
            <div
              className="text-center"
              style={{
                // backgroundColor: "white",
                paddingBottom: "2em",
              }}
            >
              <Image
                src={member.img}
                alt={`${member.name} ${member.surname}`}
                roundedCircle
                style={{ width: "150px", height: "150px" }}
              />
              <h4 className="mt-1">{`${member.name} ${member.surname}`}</h4>
              <p
                style={{
                  fontStyle: "italic",
                }}
              >
                {member.country}
              </p>
              <Link to={member.linkedin} target="_blank">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  fill="#0177b5"
                  class="bi bi-linkedin"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
                </svg>
              </Link>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default TeamLanding;
