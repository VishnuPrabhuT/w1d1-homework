import React from "react";
import { Navbar, NavbarBrand } from "reactstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default class AppNavbar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Navbar className="navbar-dark bgdark px-5" expand="md">
                <NavbarBrand tag={Link} to="/">
                    Home
                </NavbarBrand>
            </Navbar>
        );
    }
}
