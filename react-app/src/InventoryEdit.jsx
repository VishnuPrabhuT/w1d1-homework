import React from "react";
import {
    Button,
    ButtonGroup,
    Container,
    Form,
    FormGroup,
    Input,
    Label,
} from "reactstrap";
import AppNavbar from "./Navbar";
import { Link, withRouter } from "react-router-dom";

class InventoryEdit extends React.Component {
    emptyInventory = {
        prodname: "",
        qty: "",
        price: "",
        status: "",
    };

    constructor(props) {
        super(props);
        this.state = {
            item: this.emptyInventory,
        };
    }

    async componentDidMount() {
        console.log(this.props.match.params.id !== "new");

        if (this.props.match.params.id !== "new") {
            const res = await fetch(
                `http://localhost:8000/api/inventory/${this.props.match.params.id}`
            );
            console.log("inventory---");
            const inventory = await res.json();

            this.setState({ item: inventory });
        }
    }

    handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = { ...this.state.item };
        item[name] = value;
        this.setState({ item });
    };

    handleSubmit = async (event) => {
        event.preventDefault();
        const { item } = this.state;
        console.log(item);

        await fetch("http://localhost:8000/api/inventory", {
            method: item._id ? "PUT" : "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(item),
        });
        this.props.history.push("/inventories");
    };

    render() {
        const { item } = this.state;
        const title = (
            <h2 className="mt-3">
                {item._id ? "Edit Inventory" : "Add Inventory"}
            </h2>
        );

        return (
            <div>
                <AppNavbar />
                <Container>
                    {title}
                    <Form>
                        <FormGroup>
                            <Label for="prodname" className="h5 mt-3">
                                Product Name
                            </Label>
                            <Input
                                type="text"
                                name="prodname"
                                id="prodname"
                                value={this.state.item.prodname || ""}
                                onChange={this.handleChange}
                                autoComplete="prodname"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="qty" className="h5 mt-3">
                                Quantity
                            </Label>
                            <Input
                                type="text"
                                name="qty"
                                id="qty"
                                value={this.state.item.qty || ""}
                                onChange={this.handleChange}
                                autoComplete="qty"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="price" className="h5 mt-3">
                                Price
                            </Label>
                            <Input
                                type="text"
                                name="price"
                                id="price"
                                value={this.state.item.price || ""}
                                onChange={this.handleChange}
                                autoComplete="price"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="status" className="h5 mt-3">
                                Status
                            </Label>
                            <Input
                                type="text"
                                name="status"
                                id="status"
                                value={this.state.item.status || ""}
                                onChange={this.handleChange}
                                autoComplete="status"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Button
                                color="primary"
                                type="submit"
                                className="mt-3"
                                onClick={this.handleSubmit}
                            >
                                Submit
                            </Button>{" "}
                            <Button
                                color="secondary"
                                type="submit"
                                tag={Link}
                                to="/inventories"
                                className="mt-3"
                            >
                                Cancel
                            </Button>
                        </FormGroup>
                    </Form>
                </Container>
            </div>
        );
    }
}

export default withRouter(InventoryEdit);
