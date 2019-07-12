import React from "react";
import Navbar from "./Navbar";

import style from "./Layout.module.css";
//Components
import { Container, Row, Col } from "shards-react";

const Layout = ({ children }) => {
  return (
    <div className={style.background}>
      <Navbar />

      <Container>
        <Row>
          <Col>{children}</Col>
        </Row>
      </Container>
    </div>
  );
};

export default Layout;
