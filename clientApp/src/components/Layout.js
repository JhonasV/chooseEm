import React from "react";
import NavBar from "./Navbar";

import style from "./Layout.module.css";
//Components
import { Container, Row, Col } from "shards-react";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className={style.background}>
      <header className="mb-1">
        <NavBar />
      </header>

      <Container className="mb-5">
        <Row>
          <Col>{children}</Col>
        </Row>
      </Container>
      <div className="fixed-bottom">
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
