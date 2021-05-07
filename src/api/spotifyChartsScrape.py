from bs4 import BeautifulSoup
import requests
from flask import Flask, json
import db

CHARTS_URL = "https://spotifycharts.com/"
VIRAL = "viral/"
TOP200 = "regional/"
US = "us/"
NZ = "nz/"

TRACKID_IDX = 0
POSITION_IDX = 1
SONG_IDX = 3

app = Flask(__name__)

@app.route('/data', methods=['GET'])
def collect_data(country, chart, date):
    print(CHARTS_URL + chart + country + "daily/" + date)
    r = requests.get(CHARTS_URL + chart + country + "daily/" + date)
    print(r)
    if (r.status_code == 200):
        print("success")
        html = r.text
        # parse the html
        html_dump = BeautifulSoup(html, 'html.parser')
        # find the table listing the songs
        list_html = html_dump.find('table')
        # find all of the rows of the table
        rows = list_html.find_all('tr')
        # go through songs
        songDetails = []
        for row in rows[1:]:
            cols = row.find_all('td')
            position = cols[POSITION_IDX].string.strip()
            track_id = cols[TRACKID_IDX].find('a').get('href').replace("https://open.spotify.com/track/", "")
            songDetails.append({
                "id": track_id,
                "pos": position,
            })
        return {"tracks": songDetails}

@app.route('/getDate/<date>', methods=['GET'])
def queryDB(date):
    day = date[4]+date[5]+date[6]+date[7]+"-"+date[0]+date[1]+"-"+date[2]+date[3]
    country = US
    tracks = db.select_tracks_from_date(day, country) 
    songList = []
    for t in tracks:
        songList.append({
            "id": t[0],
            "pos": t[1]
        })
    return {"tracks": songList}

if __name__ == '__main__': 
    app.run()