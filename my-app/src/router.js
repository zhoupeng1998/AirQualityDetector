import React from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import {HomepageLayout as Home} from './pages/HomePage';
import Us from './pages/AboutUs';
import Challenges from './pages/Challenges';
import Demo from './pages/demo';
import Record from './pages/Record';
import HistoryChart from "./pages/history";



const BasicRoute = () => (
    <HashRouter>
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/aboutus" component={Us}/>
            <Route exact path="/challengs" component={Challenges}/>
            <Route exact path='/demo' component={Demo}/>
            <Route exact path='/Record' component={Record}/>
            <Route exact path='/history' component={HistoryChart} />
        </Switch>
    </HashRouter>
);


export default BasicRoute;