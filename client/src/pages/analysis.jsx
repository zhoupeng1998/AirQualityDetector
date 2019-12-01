import React, {Component} from 'react';
import axios from 'axios';
import {List} from 'semantic-ui-react';



class Analysis extends Component {

    state = {

        /*
        id:[],
        ip:[],
        time: [],
        */   
        humidity:[],
        temp: [],
        gas:[],
        co2:[],
        tvoc:[],
        
    }


    componentDidMount () {
        var _this = this;
        axios.get('http://13.57.9.33:8080/record').then((res) => {
            _this.setState({gas: res.data.gas});
            _this.setState({co2: res.data.co2});
            _this.setState({temp: res.data.temperature});
            _this.setState({humidity: res.data.humidity});
            _this.setState({tvoc: res.data.tvoc});


        }).catch(err => {
            _this.setState({data: 'ERROR'});
        });
    }


     render() {

        const minHumidity = Math.min(...this.state.humidity);
        const maxHumidity = Math.max(...this.state.humidity);
        const minTemp = Math.min(...this.state.temp);
        const maxTemp = Math.max(...this.state.temp);
        const minCo2 = Math.min(...this.state.co2);
        const maxCo2 = Math.max(...this.state.co2);
        const minTvoc = Math.min(...this.state.tvoc);
        const maxTvoc = Math.max(...this.state.tvoc);

        return (
            <div class='ui list'>

                <div class='item'>Max Temperature: {maxTemp}ºC</div >
                <div class='item'>Min Temperature: {minTemp}ºC</div >
                <div class='item'>Max Humidity: {maxHumidity}%</div >
                <div class='item'>Min Humidity: {maxHumidity}%</div >
                <div class='item'>Max CO2: {maxCo2}ppm</div >
                <div class='item'>Min CO2: {minCo2}ppm</div >
                <div class='item'>Max TVOC: {maxTvoc}ppm</div >
                <div class='item'>Min TVOC: {minTvoc}ppm</div >
 
            
            Hello World
            </div>
        )
            
            
     }

}

export default Analysis;


