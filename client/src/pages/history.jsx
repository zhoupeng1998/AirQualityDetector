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
        gas: []
    }

    constructor () {
        super()
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
                <LineChart data={tempHumidChart} options={tempHumidOptions} width='1000' height='500' />
                <LineChart data={co2TvocChart} options={co2TvocOptions} width='1000' height='500' />
                <LineChart data={gasChart} options={gasOptions} width='1000' height='500'/>
            </div>
          );
    }
}

export default HistoryChart;