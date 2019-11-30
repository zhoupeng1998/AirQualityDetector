import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch, Link, Redirect} from "react-router-dom";

import MainPage from './pages/index';
import HistoryChart from "./pages/history";


import RealTimeData from './pages/realtime';


class App extends Component {

    render () {
        return (
            <Router>
                <Switch>
                    <Route exact path='/' component={MainPage} />
                    <Route exact path='/history' component={HistoryChart} />

                    <Route exact path='/realtime' component={RealTimeData} />

                </Switch>
            </Router>
        );
    }
}

export default App;
