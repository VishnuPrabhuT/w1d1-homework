import React from "react";
import Home from "./Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import InventoryList from "./InventoryList";
import InventoryEdit from "./InventoryEdit";

import "./App.css";

export default class App extends React.Component {
    render() {
        return (
            <>
                <Router>
                    <div>
                        <Switch>
                            <Route path="/" exact={true} component={Home} />
                            <Route
                                path="/inventories"
                                exact={true}
                                component={InventoryList}
                            />
                            <Route
                                path="/inventories/:id"
                                exact={true}
                                component={InventoryEdit}
                            />
                        </Switch>
                    </div>
                </Router>
            </>
        );
    }
}
