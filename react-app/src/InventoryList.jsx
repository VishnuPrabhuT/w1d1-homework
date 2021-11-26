import React from "react";
import { Button, ButtonGroup, Container, Table } from "reactstrap";
import AppNavbar from "./Navbar";
import { Link } from "react-router-dom";

export default class InventoryList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inventories: [],
            isLoading: true,
        };
    }

    componentDidMount() {
        this.setState({ isLoading: true });

        fetch("http://localhost:8000/api/inventories")
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                console.log(data);

                this.setState({ inventories: data, isLoading: false });
            });
    }

    removeInv = async (id) => {
        let res = await fetch(`http://localhost:8000/api/inventory/${id}`, {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        });

        console.log("Remove Done!", await res.json());

        let updateInventories = [...this.state.inventories].filter(
            (i) => i._id != id
        );
        this.setState({ inventories: updateInventories });
    };

    render() {
        const { inventories, isLoading } = this.state;

        if (isLoading) {
            return <p>Loading...</p>;
        }

        const inventoryList = inventories.map((inventory) => {
            return (
                <tr key={inventory._id}>
                    <td>{inventory.prodname}</td>
                    <td>{inventory.qty}</td>
                    <td>{inventory.price}</td>
                    <td>{inventory.status}</td>
                    <td>
                        <ButtonGroup>
                            <Button
                                size="sm"
                                color="primary"
                                tag={Link}
                                to={"/inventories/" + inventory._id}
                            >
                                Edit
                            </Button>
                            <Button
                                size="sm"
                                color="danger"
                                onClick={() => this.removeInv(inventory._id)}
                            >
                                Delete
                            </Button>
                        </ButtonGroup>
                    </td>
                </tr>
            );
        });
        return (
            <div>
                <AppNavbar />

                <Container fluid>
                    <div className="float-right">
                        <Button
                            color="success"
                            className="my-4"
                            tag={Link}
                            to="/inventories/new"
                        >
                            Add Inventory
                        </Button>
                    </div>
                    <h3>Inventory List</h3>
                    <Table className="mt-4">
                        <thead>
                            <tr>
                                <th width="20%">Product Name</th>
                                <th width="15%">Quantity</th>
                                <th width="15%">Price</th>
                                <th width="15%">Status</th>
                                <th width="15%">Actions</th>
                            </tr>
                        </thead>
                        <tbody>{inventoryList}</tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}
