import React from 'react';
import SongBox from "./SongBox.js"
import { Row } from 'react-simple-flex-grid';
import "react-simple-flex-grid/lib/main.css";

function SongsContainer(props){
    return (
        <Row gutter={40}>
        {props.songs.map(s => 
            <SongBox key={s.id} song={s}/>
        )}
        </Row>
    )
}

export default SongsContainer;