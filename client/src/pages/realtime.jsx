import React, {Component} from 'react';
import axios from 'axios';

class RealTimeData extends Component {
    
    state = {
        time: '', temp: '', humidity: '', co2: '', tvoc: '',
        gas: '', lon: '', lat: ''
    }

    constructor () {
        super();
    }

    componentDidMount () {
        var _this = this;
        axios.get('http://13.57.9.33:8080/latest').then((res) => {
            _this.setState({
                time: res.data[0].time,
                temp: res.data[0].temp,
                humidity: res.data[0].humidity,
                co2: res.data[0].co2,
                tvoc: res.data[0].tvoc,
                gas: res.data[0].gas,
                lon: res.data[0].lon,
                lat: res.data[0].lat
            });
            console.log(this.state.time);
        }).catch(err => {
            _this.setState({data: 'ERROR'});
        });
    }

    render () {
        return (
            <div>
                <p>Time: {this.state.time} UTC</p>
                <p>Temperature: {this.state.temp}ºC</p>
                <p>Humidity: {this.state.humidity}%</p>
                <p>CO2: {this.state.co2}ppm</p>
                <p>TVOC: {this.state.co2}ppm</p>
                <p>Gas: {this.state.co2}ppm</p>
                <p>Location: {this.state.lat}, {this.state.lon}</p>
            </div>
        );
    }
}

export default RealTimeData;