import React, {Component} from 'react';
import axios from 'axios';
import {List, Label, Input, Button} from 'semantic-ui-react';

class Analysis extends Component {

    state = { 
        humidity:[], avg_humidity:'',
        temp: [], avg_temp:'',
        gas:[], avg_gas:'',
        co2:[], avg_co2:'',
        tvoc:[], avg_tvoc:'',
        mode: 'All', week: 'All'
    }

    constructor (props) {
        super(props);
        this.handleModeChange = this.handleModeChange.bind(this);
        this.handleWeekChange = this.handleWeekChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleModeChange (event) {
        this.setState({mode: event.target.value});
    }

    handleWeekChange (event) {
        this.setState({week: event.target.value});
    }

    handleClick (event) {
        var href = '/analysis?';
        if (this.state.mode == '0' || this.state.mode == '1') {
            href += 'mode=' + this.state.mode + '&';
        }
        if (this.state.week == '9' || this.state.week == '10') {
            href += 'week=' + this.state.week + '&';
        }
        window.location.href = href;
    }

    componentDidMount () {
        var _this = this;
        axios.get(`http://13.57.9.33:8080/record${this.props.location.search}`).then((res) => {
            _this.setState({gas: res.data.gas, avg_gas: res.data.avg_gas});
            _this.setState({co2: res.data.co2, avg_co2: res.data.avg_co2});
            _this.setState({temp: res.data.temperature, avg_temp: res.data.avg_temperature});
            _this.setState({humidity: res.data.humidity, avg_humidity: res.data.avg_humidity});
            _this.setState({tvoc: res.data.tvoc, avg_tvoc: res.data.avg_tvoc});
        }).catch(err => {
            _this.setState({data: 'ERROR'});
        });
    }

     render() {

        const minHumidity = Math.min(...this.state.humidity);
        const maxHumidity = Math.max(...this.state.humidity);
        var avgHumidity = this.state.avg_humidity;
        const minTemp = Math.min(...this.state.temp);
        const maxTemp = Math.max(...this.state.temp);
        var avgTemp = this.state.avg_temp;
        const minCo2 = Math.min(...this.state.co2);
        const maxCo2 = Math.max(...this.state.co2);
        var avgCo2 = this.state.avg_co2;
        const minTvoc = Math.min(...this.state.tvoc);
        const maxTvoc = Math.max(...this.state.tvoc);
        var avgTvoc = this.state.avg_tvoc;
        const minGas = Math.min(...this.state.gas);
        const maxGas = Math.max(...this.state.gas);
        var avgGas = this.state.avg_gas;

        return (
            <div class='ui list'>
                
                <div>
                    Mode:&nbsp;&nbsp;&nbsp;
                    <label>
                        <input type="radio" name="mode" value='0' onChange={this.handleModeChange}/>Indoors
                    </label>&nbsp;&nbsp;&nbsp;
                    <label>
                        <input type="radio" name="mode" value='1' onChange={this.handleModeChange}/>Outdoors
                    </label>&nbsp;&nbsp;&nbsp;
                    <label>
                        <input type="radio" name="mode" value='All' onChange={this.handleModeChange}/>All
                    </label><br />
                </div>
                
                <div>
                    Week:&nbsp;&nbsp;&nbsp;
                    <label>
                        <input type="radio" name="week" value='9' onChange={this.handleWeekChange}/>Week 9
                    </label>&nbsp;&nbsp;&nbsp;
                    <label>
                        <input type="radio" name="week" value='10' onChange={this.handleWeekChange}/>Week 10
                    </label>&nbsp;&nbsp;&nbsp;
                    <label>
                        <input type="radio" name="week" value='All' onChange={this.handleWeekChange}/>All
                    </label><br />
                </div>
                <Button onClick={this.handleClick}>Go</Button>
                
                <div class='item'>Max Temperature: {maxTemp}ºC</div >
                <div class='item'>Min Temperature: {minTemp}ºC</div >
                <div class='item'>Average Temperature: {avgTemp}ºC</div >
                <p></p>
                <div class='item'>Max Humidity: {maxHumidity}%</div >
                <div class='item'>Min Humidity: {minHumidity}%</div >
                <div class='item'>Average Humidity: {avgHumidity}%</div >
                <p></p>
                <div class='item'>Max CO2: {maxCo2}ppm</div >
                <div class='item'>Min CO2: {minCo2}ppm</div >
                <div class='item'>Average CO2: {avgCo2}ppm</div >
                <p></p>
                <div class='item'>Max TVOC: {maxTvoc}ppm</div >
                <div class='item'>Min TVOC: {minTvoc}ppm</div >
                <div class='item'>Average TVOC: {avgTvoc}ppm</div >
                <p></p>
                <div class='item'>Max Gas: {maxGas}ppm</div >
                <div class='item'>Min Gas: {minGas}ppm</div >
                <div class='item'>Average Gas: {avgGas}ppm</div >
            </div>
        )
            
            
     }

}

export default Analysis;


