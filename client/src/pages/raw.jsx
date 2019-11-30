import React, {Component} from 'react';
import axios from 'axios';


class RawData extends Component {

    state = {
        data:[],
        /*
        id:[],
        ip:[],
        time: [],
        gas:[],
        co2:[],
        temp: [],
        humidity: [],
        lon: [],
        lat: [],
        outdoor:[],
        */
    }


    componentDidMount () {
        var _this = this;
        axios.get('http://13.57.9.33:8080/raw').then((res) => {
            /*
            _this.setState({id: res.data.id.reverse()});
            _this.setState({ip: res.data.ip.reverse()});
            _this.setState({time: res.data.time.reverse()});
            _this.setState({gas: res.data.gas.reverse()});
            _this.setState({co2: res.data.co2.reverse()});
            _this.setState({temp: res.data.temperature.reverse()});
            _this.setState({humidity: res.data.humidity.reverse()});
            _this.setState({lon: res.data.lon.reverse()});
            _this.setState({lat: res.data.lat.reverse()});
            _this.setState({outdoor: res.data.__v.reverse()});
            */
           let less = res.data;
           console.log(res.data.id);
           console.log(`this is want we want: {less)} \n`);

        }).catch(err => {
            _this.setState({data: 'ERROR'});
        });
    }
    /*
    renderTableData() {
        return this.state.map((student, index) => {
           const { id, name, age, email } = student //destructuring
           return (
              <tr key={id}>
                 <td>{id}</td>
                 <td>{name}</td>
                 <td>{age}</td>
                 <td>{email}</td>
              </tr>
           )
        })
     }*/

     render() {
        return (
            <div>
            Hello World
            </div>
        )
            
            
     }

}

export default RawData;


