import React from 'react'

function sortTime(time) {
    if (time.length > 5) {
        return time;
    }
    var curr_time = new Date().getTime();
    var time_diff = (((curr_time - time) / 1000) / 60).toFixed(0);
    if ((time_diff / 60) >= 24) {
        time = ((time_diff / 60) / 24).toFixed(0) + "d";
    } else if (time_diff >= 60) {
        time = (time_diff / 60).toFixed(0) + "h";
    } else {
        time = time_diff + "m";
    }
    return time;
}

function TimePosted(props) {
    const { time } = props;
    return (
        <h4>December 6th, 2019 </h4>
    )
}

export default TimePosted