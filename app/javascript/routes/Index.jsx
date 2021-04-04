import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import Portfolio from "../components/Portfolio";
import CreateAsset from "../components/CreateAsset";

export default (
    <Router>
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/portfolio" exact component={Portfolio}/>
            <Route path="/createAsset" exact component={CreateAsset}/>
        </Switch>
    </Router>
);