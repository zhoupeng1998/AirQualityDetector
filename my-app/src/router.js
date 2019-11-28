import React from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import Home from './pages/HomePage';
import Us from './pages/AboutUs';
import Challenges from './pages/Challenges';
import Demo from './pages/demo';
import Record from './pages/Record';




const BasicRoute = () => (
    <HashRouter>
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/aboutus" component={Us}/>
            <Route exact path="/challengs" component={Challenges}/>
            <Route exact path='/demo' component={Demo}/>
            <Route exact path='/Record' component={Record}/>
        </Switch>
    </HashRouter>
);


export default BasicRoute;