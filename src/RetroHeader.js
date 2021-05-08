import React from 'react'

const RetroHeader = () => {
    return (
        <div>
            <p className="headerText">
                Pick a day! This page will display the songs in the top 50 viral charts from that day that were released more than 20 years before. <br/>
                These are the "retro" songs that happened to be popular on your selected day! <br/>
                Hint: try entering dates near holidays or deaths of famous musicians
            </p>
            <h1>Retro Tracker</h1>
        </div>
    );
}

export default RetroHeader;