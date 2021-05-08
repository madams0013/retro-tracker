import React from 'react';
import "./index.css"
import { Col } from 'react-simple-flex-grid';

// tile for each song displayed
function SongBox(props) {
    return (
        <Col 
            xs={{ span: 6 }} sm={{ span: 4 }} md={{ span: 3 }}
            lg={{ span: 2 }} xl={{ span: 1 }}
        >
            <div className="tileLabels">
                <img src={props.song.image.url} alt="album cover" width="100%"/>
                <div>{props.song.title}</div>
                <div style={{color: `#ff00ff`}}>{props.song.artists.map(a => <div>{a}</div>)}</div>
                {props.song.releaseDate}
            </div>
        </Col>
    )
}

export default SongBox;