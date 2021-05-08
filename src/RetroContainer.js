import React from 'react';
import RetroHeader from "./RetroHeader.js"
import SelectBar from "./SelectBar.js"
import PickSong from './PickSong.js'

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
            songs: [],
            res: "",
            justQueried: false,
        };
    }

    submitDate = async (date) => {

        if (this.state.res.access_token) {
            spotifyApi.setAccessToken(this.state.res.access_token);
        }

        const dayForAPI = `${date.month}${date.day}${date.year}`

        fetch(`/getDate/${dayForAPI}`)
            .then(res => res.json())
            .then(data=> {
                return data.tracks.map(t=>t.id)
            })
            .then(tracks => {
                spotifyApi.getTracks(tracks)
                    .then(response => {
                        let songsArray = response.tracks.map((s) => 
                        // not exactly by day, but correct by year
                        {
                            return (
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
                        songsArray = songsArray.filter(s => s.releaseDate.slice(0,4) < date.year-20)
                        return songsArray
                    }).then(songsArray => {
                        this.setState({
                            songs: songsArray,
                            justQueried: true
                        })
                    })
            })
    }

    componentDidMount() {
        fetch(authEndpoint, requestOptions)
            .then((response) => response.json())
            .then((data) => this.setState({res: data}));
    }

    render() {
        return (
            <div>
                <RetroHeader/>
                <SelectBar submitDate={this.submitDate}/>
                <PickSong songs={this.state.songs} justQueried={this.state.justQueried}/>
                <SongsContainer songs={this.state.songs}/>
            </div>
        )
    }
}

export default RetroContainer;