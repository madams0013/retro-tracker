import db

table_order = ['track_id', 'acousticness', 'danceability', 'duration_ms', 'energy', 'instrumentalness', 'key', 'liveness', 'loudness', 'mode', 'speechiness', 'tempo', 'time_signature', 'valence']

def collect_and_input_data(track_ids):
    counter = 0
    for track in track_ids:
        r = requests.get(FEATURES_URL + track, headers=headers)
        inputs = [None for _ in range(len(table_order))]
        if r.status_code == 200:
            info = r.json()
            if counter == 0:
                print(info)
            info['track_id'] = info['id']
            del info['id']
            del info['track_href']
            del info['uri']
            del info['type']
            del info['analysis_url']
            for feature in info:
                idx = table_order.index(feature)
                inputs[idx] = info[feature]
        else:
            print(str(r.status_code) + " " + FEATURES_URL + track)
            inputs[0] = track
        params = tuple(inputs)
        error = db.insert_features(params)
        if error:
            print(error)

db.reset_features_table()
track_ids = db.select_all_track_ids()
collect_and_input_data(track_ids)
