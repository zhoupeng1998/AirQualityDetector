import React, {Component} from 'react';
import axios from 'axios';
import {Line as LineChart} from 'react-chartjs-2';

class HistoryChart extends Component {
    state = {
        time: [],
        temperature: [],
        humidity: []
    }

    constructor () {
        super()
    }

    componentDidMount () {
        var _this = this;
        axios.get('http://13.57.9.33:8080/record').then((res) => {
            console.log(res.data);
            _this.setState({time: res.data.time.reverse()});
            _this.setState({temperature: res.data.temperature.reverse()});
            _this.setState({humidity: res.data.humidity.reverse()});

        }).catch(err => {
            _this.setState({data: 'ERROR'});
        });
    }

    render () {
        var chart = {
            labels: this.state.time,
            datasets: [
                {label: "Temperature", yAxisID: 'Temperature', data: this.state.temperature, borderColor: 'rgba(75,192,192,1)', fill:false},
                {label: "Humidity", yAxisID: 'Humidity', data: this.state.humidity, borderColor: 'rgba(255, 0, 0, 1)', fill:false}
            ]
        }

        const options = {
            scales: {
                yAxes: [{
                  id: 'Temperature',
                  type: 'linear',
                  scaleLabel: {
                    labelString: 'Temperature (ºC)',
                    display: true,
                  },
                  position: 'left',
                },
                {
                  id: 'Humidity',
                  type: 'linear',
                  scaleLabel: {
                    labelString: 'Humidity (%)',
                    display: true,
                  },
                  position: 'right',
                }]
            }
        }
        return (
            <div>
                <LineChart data={chart} options={options} width='1000' height='500' />
            </div>
          );
    }
}

export default HistoryChart;