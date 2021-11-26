import React from "react";
import AppNavbar from "./Navbar";
import { Link } from "react-router-dom";
import { Button, Container } from "reactstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

export default class Home extends React.Component {
    render() {
        return (
            <div>
                <AppNavbar />
                <Container fluid>
                    <Button className="m-5 nav bg-light">
                        <Link to="/inventories" className="nav-link">
                            Manage Inventory List
                        </Link>
                    </Button>
                </Container>
            </div>
        );
    }
}
