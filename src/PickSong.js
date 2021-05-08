import React from 'react'

function PickSong(props) {
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