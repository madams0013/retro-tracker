import React from 'react'

// Renders text depending on the state
function PickSong(props) {
    // if the page has just been opened and no queries have yet been made, render "Pick a date!"
    // if there was a query that returned no data, render "No retro songs on this day :("
    if (props.songs.length === 0 && !props.justQueried) {
        return (
            <div>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <h1>Pick a date!</h1>
            </div>
        )
    } else if (props.songs.length === 0 && props.justQueried) {
        return (
            <div>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <h1>No retro songs on this day :(</h1>
            </div>
        )
    } else {
        return (null)
    }
}

export default PickSong;