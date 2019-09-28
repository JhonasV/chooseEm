import React from "react";
import NavBar from "./Navbar";

import style from "./Layout.module.css";
//Components
import { Container, Row, Col } from "shards-react";

const Layout = ({ children }) => {
  return (
    <div className={style.background}>
      <header className="mb-5">
        <NavBar />
      </header>

      <Container>
        <Row>
          <Col>{children}</Col>
        </Row>
      </Container>
    </div>
  );
};

export default Layout;
