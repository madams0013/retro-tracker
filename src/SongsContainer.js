import React from 'react';
//import SongBox from "./SongBox.js"
import { Row, Col } from 'react-simple-flex-grid';
import "react-simple-flex-grid/lib/main.css";

function SongsContainer(props){
    return (

        <Row gutter={40}>
            {props.songs.map(s => 
                <Col 
                    xs={{ span: 6 }} sm={{ span: 4 }} md={{ span: 3 }}
                    lg={{ span: 2 }} xl={{ span: 1 }}
                >
                    <img src={s.image.url} alt="album cover" width="100%"/>
                    {s.title}<br/>
                    {s.artists.map(a => a+' ')}<br/>
                    {s.releaseDate}
                </Col>
            )}
        </Row>

        // <ul>
        //     {
        //         props.songs.map(song =>
        //             <SongBox
        //                 key = {song.id}
        //                 title = {song.title}
        //                 artists = {song.artists}
        //                 releaseDate = {song.releaseDate}
        //                 image = {song.image}
        //             />
        //         )
        //     }
        // </ul>
    )
}

export default SongsContainer;