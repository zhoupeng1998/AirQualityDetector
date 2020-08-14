import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch, Link, Redirect} from "react-router-dom";
import {Navbar, Nav, NavDropdown, Form, FormControl, Button} from 'react-bootstrap';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import MainPage from './pages/index';
import HistoryChart from "./pages/history";
import Analysis from './pages/analysis';
import RealTimeData from './pages/realtime';

function App() {
  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">Air Quality Detector</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/history">Plot</Nav.Link>
          <Nav.Link href="/realtime">Realtime</Nav.Link>
          <Nav.Link href="/analysis">Analysis</Nav.Link>
        </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Router>
        <Switch>
          <Route exact path='/' component={MainPage} />
          <Route exact path='/history' component={HistoryChart} />
          <Route exact path='/analysis' component={Analysis} />
          <Route exact path='/realtime' component={RealTimeData} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
