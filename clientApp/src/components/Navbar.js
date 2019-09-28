import React, { useState } from "react";
import { NavLink as NavLinkDom } from "react-router-dom";
import "./Navbar.module.css";
import {
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Collapse,
  Container
} from "shards-react";

const NavBar = props => {
  const [isCollapseOpen, setCollapseOpen] = useState(false);

  return (
    <Navbar
      type="dark"
      // theme="info"
      style={{ backgroundColor: "#00b894" }}
      expand="md"
    >
      <Container>
        <NavbarBrand>
          {/* <NavLink> */}
          <NavLinkDom
            activeClassName="active-link"
            className="font-weight-bold text-white"
            to="/"
          >
            <i className="fas fa-child"></i> ChooseEm
          </NavLinkDom>
          {/* </NavLink> */}
        </NavbarBrand>
        <NavbarToggler onClick={() => setCollapseOpen(!isCollapseOpen)} />
        <Collapse open={isCollapseOpen} navbar>
          <Nav navbar className="ml-auto">
            <NavItem>
              {/* <NavLink> */}
              <NavLinkDom
                activeClassName="active-link"
                className="font-weight-bold text-white mr-3"
                to="/"
              >
                <i className="fas fa-vote-yea"></i> Vote Now!
              </NavLinkDom>
              {/* </NavLink> */}
            </NavItem>
            <NavItem>
              {/* <NavLink> */}
              <NavLinkDom
                activeClassName="active-link"
                className="font-weight-bold text-white mr-3"
                to="/charts"
              >
                <i className="fas fa-chart-pie"></i> Charts
              </NavLinkDom>
              {/* </NavLink> */}
            </NavItem>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
