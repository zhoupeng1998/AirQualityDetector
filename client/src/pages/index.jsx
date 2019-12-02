import React, {Component} from 'react';

const MainPage = () => {
    return (
        <div>
            <a href='/'>Home</a>&nbsp;&nbsp;
            <a href='/history'>Plot</a>&nbsp;&nbsp;
            <a href='/realtime'>Realtime</a>&nbsp;&nbsp;
            <a href='/analysis'>Analysis</a><br />
            <h1>Welcome to Air Quality Detector website, an IoT Project</h1>
        </div>
    )
}

export default MainPage;