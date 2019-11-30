import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch, Link, Redirect} from "react-router-dom";

import MainPage from './pages/index';
import HistoryChart from "./pages/history";
import RawData from "./pages/raw";

class App extends Component {

    render () {
        return (
            <Router>
                <Switch>
                    <Route exact path='/' component={MainPage} />
                    <Route exact path='/history' component={HistoryChart} />
                    <Route exact path='/raw' component={RawData} />
                </Switch>
            </Router>
        );
    }
}

export default App;
