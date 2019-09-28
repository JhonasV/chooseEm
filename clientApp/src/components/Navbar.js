import React, { useState } from "react";
import { NavLink as NavLinkDom } from "react-router-dom";
import "./Navbar.module.css";
import {
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  Collapse,
  Container
} from "shards-react";

const NavBar = () => {
  const [isCollapseOpen, setCollapseOpen] = useState(false);

  return (
    <Navbar type="dark" className="bg-primary-custom" expand="md">
      <Container>
        <NavLinkDom
          activeClassName="active-link"
          className="font-weight-bold text-white navbar-brand"
          to="/"
        >
          <i className="fas fa-child"></i> ChooseEm
        </NavLinkDom>
        <NavbarToggler onClick={() => setCollapseOpen(!isCollapseOpen)} />
        <Collapse open={isCollapseOpen} navbar>
          <Nav navbar className="ml-auto">
            <NavItem>
              <NavLinkDom
                activeClassName="active-link"
                className="font-weight-bold text-white mr-3"
                to="/"
              >
                <i className="fas fa-vote-yea"></i> Vote Now!
              </NavLinkDom>
            </NavItem>
            <NavItem>
              <NavLinkDom
                activeClassName="active-link"
                className="font-weight-bold text-white mr-3"
                to="/charts"
              >
                <i className="fas fa-chart-pie"></i> Charts
              </NavLinkDom>
            </NavItem>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
