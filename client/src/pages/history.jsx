import React, {Component} from 'react';
import axios from 'axios';
import {Line as LineChart, Scatter} from 'react-chartjs-2';

class HistoryChart extends Component {
    state = {
        time: [],
        temperature: [],
        humidity: [],
        co2: [],
        tvoc: [],
        gas: [],
        mode: 'All', week: 'All', location: 'All', limit: 'All'
    }

    constructor () {
        super()
        this.handleModeChange = this.handleModeChange.bind(this);
        this.handleWeekChange = this.handleWeekChange.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.handleLimitChange = this.handleLimitChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount () {
        var _this = this;
        axios.get(`http://13.57.9.33:8080/record${this.props.location.search}`).then((res) => {

            _this.setState({time: res.data.time.reverse(), temperature: res.data.temperature.reverse(), 
                humidity: res.data.humidity.reverse(), co2: res.data.co2.reverse(), tvoc: res.data.tvoc.reverse(),
                gas: res.data.gas.reverse()
            });

        }).catch(err => {
            _this.setState({data: 'ERROR'});
        });
    }

    handleModeChange (event) {
        this.setState({mode: event.target.value});
    }

    handleWeekChange (event) {
        this.setState({week: event.target.value});
    }

    handleLocationChange (event) {
        this.setState({location: event.target.value});
    }

    handleLimitChange (event) {
        this.setState({limit: event.target.value});
    }

    handleClick (event) {
        var href = '/history?';
        if (this.state.mode == '0' || this.state.mode == '1') {
            href += 'mode=' + this.state.mode + '&';
        }
        if (this.state.week == '9' || this.state.week == '10') {
            href += 'week=' + this.state.week + '&';
        }
        if (this.state.location != 'All') {
            href += 'location=' + this.state.location + '&';
        }
        if (this.state.limit != 'All') {
            href += 'limit=' + this.state.limit;
        }
        window.location.href = href;
    }

    render () {
        var tempHumidChart = {
            labels: this.state.time,
            datasets: [
                {label: "Temperature", yAxisID: 'Temperature', data: this.state.temperature, borderColor: 'rgba(75,192,192,1)', fill:false},
                {label: "Humidity", yAxisID: 'Humidity', data: this.state.humidity, borderColor: 'rgba(255, 0, 0, 1)', fill:false}
            ]
        };

        var co2TvocChart = {
            labels: this.state.time,
            datasets: [
                {label: "CO2", yAxisID: 'CO2', data: this.state.co2, borderColor: 'rgba(75,192,192,1)', fill:false},
                {label: "TVOC", yAxisID: 'TVOC', data: this.state.tvoc, borderColor: 'rgba(255, 0, 0, 1)', fill:false}
            ]
        };

        var gasChart = {
            labels: this.state.time,
            datasets: [
                {label: "Gas", yAxisID: 'Gas', data: this.state.gas, borderColor: 'rgba(75,192,192,1)', fill:false}
            ]
        };

        const tempHumidOptions = {
            scales: {
                yAxes: [{
                  id: 'Temperature', type: 'linear',
                  scaleLabel: {
                    labelString: 'Temperature (ºC)',
                    display: true,
                  },
                  position: 'left',
                },
                {
                  id: 'Humidity', type: 'linear',
                  scaleLabel: {
                    labelString: 'Humidity (%)',
                    display: true,
                  },
                  position: 'right',
                }]
            }
        };

        const co2TvocOptions = {
            scales: {
                yAxes: [{
                  id: 'CO2', type: 'linear',
                  scaleLabel: {
                    labelString: 'CO2 (ppm)',
                    display: true,
                  },
                  position: 'left',
                },
                {
                  id: 'TVOC', type: 'linear',
                  scaleLabel: {
                    labelString: 'TVOC (ppm)',
                    display: true,
                  },
                  position: 'right',
                }]
            }
        }

        const gasOptions = {
            scales: {
                yAxes: [{
                    id: 'Gas', type: 'linear',
                    scaleLabel: {
                      labelString: 'Gas (ppm)',
                      display: true,
                    },
                    position: 'left',
                }]
            }
        };

        return (
            <div>

                <div>
                    <a href='/'>Home</a>&nbsp;&nbsp;
                    <a href='/history'>Plot</a>&nbsp;&nbsp;
                    <a href='/realtime'>Realtime</a>&nbsp;&nbsp;
                    <a href='/analysis'>Analysis</a><br /><br />
                </div>

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

                <div>
                    Location:&nbsp;&nbsp;&nbsp;
                    <label>
                        <input type="radio" name="location" value='on' onChange={this.handleLocationChange}/>On Campus
                    </label>&nbsp;&nbsp;&nbsp;
                    <label>
                        <input type="radio" name="location" value='off' onChange={this.handleLocationChange}/>Off Campus
                    </label>&nbsp;&nbsp;&nbsp;
                    <label>
                        <input type="radio" name="location" value='All' onChange={this.handleLocationChange}/>All
                    </label><br />
                </div>

                <div>
                    Limit:&nbsp;&nbsp;&nbsp;
                    <label>
                        <input type="radio" name="limit" value='20' onChange={this.handleLimitChange}/>20
                    </label>&nbsp;&nbsp;&nbsp;
                    <label>
                        <input type="radio" name="limit" value='50' onChange={this.handleLimitChange}/>50
                    </label>&nbsp;&nbsp;&nbsp;
                    <label>
                        <input type="radio" name="limit" value='100' onChange={this.handleLimitChange}/>100
                    </label>&nbsp;&nbsp;&nbsp;
                    <label>
                        <input type="radio" name="limit" value='All' onChange={this.handleLimitChange}/>All
                    </label><br />
                </div>
                <button onClick={this.handleClick}>Go</button><br /><br />

                <LineChart data={tempHumidChart} options={tempHumidOptions} width='1000' height='500' />
                <LineChart data={co2TvocChart} options={co2TvocOptions} width='1000' height='500' />
                <LineChart data={gasChart} options={gasOptions} width='1000' height='500'/>
            </div>
          );
    }
}

export default HistoryChart;