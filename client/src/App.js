import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch, Link, Redirect} from "react-router-dom";

import MainPage from './pages/index';
import HistoryChart from "./pages/history";

class App extends Component {

    render () {
        return (
            <Router>
                <Switch>
                    <Route exact path='/' component={MainPage} />
                    <Route exact path='/history' component={HistoryChart} />
                </Switch>
            </Router>
        );
    }
}

export default App;
