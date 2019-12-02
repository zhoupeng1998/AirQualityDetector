import React, {Component} from 'react';
import axios from 'axios';

class RealTimeData extends Component {
    
    state = {
        id: '', mode: '',
        time: '', temp: '', humidity: '', co2: '', tvoc: '',
        gas: '', lon: '', lat: ''
    }

    constructor () {
        super();
    }

    componentDidMount () {
        var _this = this;
        axios.get('http://13.57.9.33:8080/latest').then((res) => {
            if (res.data[0].mode == '1') {
                _this.setState({mode: 'Outdoor'});
            } else {
                _this.setState({mode: 'Indoor'});
            }
            _this.setState({
                id: res.data[0].id,
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
                <p>Device ID: {this.state.id}</p>
                <p>Mode: {this.state.mode}</p>
                <p>Time: {this.state.time} UTC</p>
                <p>Temperature: {this.state.temp}ºC</p>
                <p>Humidity: {this.state.humidity}%</p>
                <p>CO2: {this.state.co2}ppm</p>
                <p>TVOC: {this.state.tvoc}ppm</p>
                <p>Gas: {this.state.gas}ppm</p>
                <p>Location: {this.state.lat}, {this.state.lon}</p>
            </div>
        );
    }
}

export default RealTimeData;