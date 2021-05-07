from bs4 import BeautifulSoup
import requests
from flask import Flask, json

CHARTS_URL = "https://spotifycharts.com/"
VIRAL = "viral/"
TOP200 = "regional/"
US = "us/"
NZ = "nz/"

TRACKID_IDX = 0
POSITION_IDX = 1
SONG_IDX = 3

companies = [{"id": 1, "name": "Company One"}, {"id": 2, "name": "Company Two"}]

api = Flask(__name__)

@api.route('/companies', methods=['GET'])
def get_companies():
    return json.dumps(companies)

if __name__ == '__main__':
    api.run()

def collect_data(country, chart, date):
    r = requests.get(CHARTS_URL + chart + country + "daily/" + date)
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
