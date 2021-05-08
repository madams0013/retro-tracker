import React from 'react';
import "./index.css"
import { Col } from 'react-simple-flex-grid';

function SongBox(props) {
    return (
        <Col 
            xs={{ span: 6 }} sm={{ span: 4 }} md={{ span: 3 }}
            lg={{ span: 2 }} xl={{ span: 1 }}
        >
            <div className="tileLabels">
                <img src={props.song.image.url} alt="album cover" width="100%"/>
                {props.song.title}<br/>
                {props.song.artists.map(a => a+' ')}<br/>
                {props.song.releaseDate}
            </div>
        </Col>
    )
}

export default SongBox;