import React from 'react';
import RetroHeader from "./RetroHeader.js"
import SelectBar from "./SelectBar.js"

import "./index.css"
import SongsContainer from './SongsContainer.js';

import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();
// hide these!
const clientID = "568261f5aef343f0be0fa481bea603c5";
const clientSecret = "b6975cf64e084255a1edf290218744b0";
const auth = 'Basic ' + btoa(clientID + ':' + clientSecret).toString('base64');
const authEndpoint = "https://accounts.spotify.com/api/token";

const requestOptions = {
    body: "grant_type=client_credentials",
    headers: {
        Authorization: auth,
        'Content-Type':'application/x-www-form-urlencoded'
    },
    method: 'POST'
};

class RetroContainer extends React.Component {

    constructor () {
        super();

        this.state = {
            selectedDate: {
                month: 5,
                day: 5,
                year: 2021
            },
            songs: [
            ],
            res: "",
            trackIDs: ["3KkXRkHbMCARz0aVfEt68P", "6MWtB6iiXyIwun0YzU6DFP", "78QR3Wp35dqAhFEc2qAGjE", "1xzBco0xcoJEDXktl7Jxrr", "2GGMabyHXnJmjY6CXhhB2e",
                        "1co0puPTYvqAdUEjFOjne9", "285pBltuF7vW8TeWk8hdRR"],
            tracksResponse: ""
        };
    }

    componentDidMount() {
        fetch(authEndpoint, requestOptions)
            .then((response) => response.json())
            .then((data) => this.setState({res: data}));

        this.submitDate()
    }

    submitDate = (date) => {
        console.log(date)

        if (this.state.res.access_token) {
            spotifyApi.setAccessToken(this.state.res.access_token);
        }
        
        const tIDs = this.state.trackIDs

        spotifyApi.getTracks(tIDs)
            .then(response => {
                let songsArray = response.tracks.map((s) => 
                    {return (
                        {
                            title: s.name,
                            id: s.id,
                            artists: s.artists.map(a => {
                                return a.name;
                            }),
                            releaseDate: s.album.release_date,
                            image: s.album.images[0],
                        })
                    });
                return songsArray;
            }).then(songsArray => {
                this.setState({
                    songs: songsArray
                })
            })
    }

    render() {
        return (
            <div>
                <RetroHeader/>
                <SelectBar submitDate={this.submitDate}/>
                <SongsContainer songs={this.state.songs}/>
            </div>
        )
    }
}

export default RetroContainer;