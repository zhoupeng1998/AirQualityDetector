import React, {Component} from 'react';

const MainPage = () => {
    return (
        <div>
            <a href='/'>Home</a>&nbsp;&nbsp;
            <a href='/history'>Plot</a>&nbsp;&nbsp;
            <a href='/realtime'>Realtime</a>&nbsp;&nbsp;
            <a href='/analysis'>Analysis</a><br />
            <h1>Welcome to Air Quality Detector website, an IoT Project</h1>
            <p>Note: The data displayed here is random generated for demo use, not real data.</p>
            <p>Authors: Peng Zhou, Songheng Zhang</p>
        </div>
    )
}

export default MainPage;