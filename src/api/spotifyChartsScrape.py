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

# For querying the pre-made DB of viral and top 200 songs
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

# THIS HASN'T BEEN WORKING -- The spotify charts server keeps responding with 503 errors
# For scraping the spotify charts website that has top charts data back many years
@app.route('/scrapeData/<date>', methods=['GET'])
def collect_data(date):
    day = date[4]+date[5]+date[6]+date[7]+"-"+date[0]+date[1]+"-"+date[2]+date[3]
    r = requests.get(CHARTS_URL + VIRAL + US + "daily/" + day)
    if (r.status_code == 200):
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

if __name__ == '__main__': 
    app.run()