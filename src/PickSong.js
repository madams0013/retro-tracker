import React from 'react'

function PickSong(props) {
    if (props.songs.length === 0 && !props.justQueried) {
        return <h1>Pick a date!</h1>
    } else if (props.songs.length === 0 && props.justQueried) {
        return <h1>No retro songs on this day :(</h1>
    } else {
        return (null)
    }
}

export default PickSong;