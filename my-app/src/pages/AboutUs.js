import React from 'react';
import {Button, Icon,Header, Container, Segment, Responsive} from 'semantic-ui-react';
import {ohterHeading as Heading, getWidth} from './HomePage';
import {BrowserRouter as Router,Route,
    Redirect,Switch, Link} from 'react-router-dom';

export default class AboutUs extends React.Component {
    render() {
        return (
            <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
                <Heading/>
                <div>
                    <a href='#/'>就决定是你了,皮卡丘</a>
                </div>
            </Responsive>
        )
    }
}
