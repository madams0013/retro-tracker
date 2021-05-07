import React from 'react';
import "./index.css"

function SongBox(props) {
    return (
        <div>
            <img classname="albumimage" src={props.image.url} alt="album cover for this track"></img>
            {console.log(props.image)}
            <div>{props.title}</div>
            <div>{props.artists}</div>
            <div>{props.releaseDate}</div>
        </div>
    )
}

export default SongBox;