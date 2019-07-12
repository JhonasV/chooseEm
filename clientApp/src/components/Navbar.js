import React from "react";
import style from "./Navbar.module.css";
import { Link } from "react-router-dom";
import {
  Navbar as NavbarShards,
  Container,
  NavbarBrand,
  Col,
  Row,
  Nav,
  NavItem,
  NavLink
} from "shards-react";
const Navbar = () => {
  return (
    <div>
      <NavbarShards full className={style.navbar_custom}>
        <Container>
          <Row className={style.row_custom}>
            <Col>
              <NavbarBrand>
                <Link to="/">ChooseEm</Link>
              </NavbarBrand>
            </Col>
            <Col className={style.flex_column}>
              <Nav>
                <NavItem>
                  <NavLink>
                    <Link to="/">Vote Now!</Link>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink>
                    <Link to="/charts">Charts</Link>
                  </NavLink>
                </NavItem>
              </Nav>
            </Col>
          </Row>
        </Container>
      </NavbarShards>
    </div>
  );
};

export default Navbar;
