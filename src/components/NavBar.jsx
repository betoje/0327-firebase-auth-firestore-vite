// NavBar.jsx

// React
import { useContext, useEffect, useState } from "react";
// React Router
import { Link, NavLink, Outlet } from "react-router-dom";
// React Context
import UserContext from "../UserContext";
// React Icons
import { AiOutlineUser } from "react-icons/ai";
// React Bootstrap
import {
  Nav,
  Navbar,
  NavDropdown,
  Image,
  Container,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
// Components
// import Card from "./Card";
// Assets
import reactLogo from "../assets/react.svg";
// Styles
import "./NavBar.css";
// Firebase

function NavBar() {
  const { userC, addUserC, allUsers, addAllUsers } = useContext(UserContext);

  return (
    <>
      <Navbar expand="md" className="bg-body-tertiary mb-4">
        <Container>
          <Navbar.Brand as={NavLink} to="/">
            <strong>REACTbank</strong>
            <Image src={reactLogo} alt="logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="navlink">
              <Nav.Link className="navlink" as={NavLink} to="/">
                Dashboard
              </Nav.Link>
              {/* <Nav.Link className="navlink" as={NavLink} to="/createaccount">
                Create Account
              </Nav.Link> */}
              {/* <Nav.Link className="navlink" as={NavLink} to="/login">
                Login
              </Nav.Link> */}
              <Nav.Link className="navlink" as={NavLink} to="/deposit">
                Deposit
              </Nav.Link>
              <Nav.Link className="navlink" as={NavLink} to="/withdraw">
                Withdraw
              </Nav.Link>
              {/* <Nav.Link className="navlink" as={NavLink} to="/balance">
                Balance
              </Nav.Link> */}
              <Nav.Link className="navlink" as={NavLink} to="/alldata">
                Users({allUsers.length})
                <AiOutlineUser />
                {userC.email}
                {/* <strong>{cUser.name}</strong> */}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
