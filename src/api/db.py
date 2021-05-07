import sqlite3
from datetime import datetime

conn = sqlite3.connect('spotifydata.db', check_same_thread=False)
cur = conn.cursor()

### ----- CREATE AND POPULATE DB ----- ###
def create_tables():
    create_viral = '''
    CREATE TABLE IF NOT EXISTS viral (
        track_id varchar(256),
        song varchar(256),
        artist varchar(256),
        position int,
        country varchar(256),
        date date
    );
    '''

    create_top_200 = '''
    CREATE TABLE IF NOT EXISTS top200 (
        track_id varchar(256),
        song varchar(256),
        artist varchar(256),
        position int,
        country varchar(256),
        date date
    )
    '''

    cur.execute(create_viral)
    cur.execute(create_top_200)
    conn.commit()

    create_top_200 = '''
    CREATE TABLE IF NOT EXISTS top200 (
        track_id varchar(256),
        song varchar(256),
        artist varchar(256),
        position int,
        country varchar(256),
        date date
    )
    '''

    cur.execute(create_viral)
    cur.execute(create_top_200)
    conn.commit()

def create_features_table():
    create_features = '''
    CREATE TABLE IF NOT EXISTS features (
        track_id varchar(256),
        acousticness FLOAT,
        danceability FLOAT,
        duration_ms INT,
        energy FLOAT,
        instrumentalness FLOAT,
        key FLOAT,
        liveness FLOAT,
        loudness FLOAT,
        mode INT,
        speechiness FLOAT,
        tempo FLOAT,
        time_signature INT,
        valence FLOAT,
        PRIMARY KEY (track_id)
    );
    '''

    cur.execute(create_features)
    conn.commit()

def insert_viral(track_id, song, artist, position, country, date):
    insert_viral = '''
    INSERT INTO viral (
        track_id,
        song,
        artist,
        position,
        country,
        date
    ) VALUES (
        ?,
        ?,
        ?,
        ?,
        ?,
        ?
    );
    '''
    cur.execute(insert_viral, (track_id, song, artist, position, country, date))
    conn.commit()

def insert_top200(track_id, song, artist, position, country, date):
    insert_top200 = '''
    INSERT INTO top200 (
        track_id,
        song,
        artist,
        position,
        country,
        date
    ) VALUES (
        ?,
        ?,
        ?,
        ?,
        ?,
        ?
    );
    '''
    cur.execute(insert_top200, (track_id, song, artist, position, country, date))
    conn.commit()

def insert_features(params):
    insert_features = '''
    INSERT INTO features (
        track_id,
        acousticness,
        danceability,
        duration_ms,
        energy,
        instrumentalness,
        key,
        liveness,
        loudness,
        mode,
        speechiness,
        tempo,
        time_signature,
        valence
    ) VALUES (
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?
    );
    '''
    try:
        cur.execute(insert_features, params)
    except sqlite3.Error as e:
        return e
    conn.commit()
    return None

### ----- QUERY DB ----- ###
def select_all_track_ids():
    cur = conn.cursor()

    # sqlite3 doesn't yet support FULL JOIN so this is a workaround
    cur.execute("WITH all_tracks(id) AS (" \
                    "SELECT DISTINCT(top200.track_id) FROM top200 LEFT JOIN viral ON " \
                    "top200.track_id = viral.track_id " \
                    "UNION " \
                    "SELECT DISTINCT(viral.track_id) FROM viral LEFT JOIN top200 ON " \
                    "viral.track_id = top200.track_id)" \
                "SELECT DISTINCT(id) from all_tracks")

    ids = cur.fetchall()
    ids = [x[0] for x in ids]
    return ids

def select_tracks_from_date(date, country):
    cur = conn.cursor()

    cur.execute('''
        SELECT track_id, position 
        FROM viral 
        WHERE date = ? 
        AND country = ?
        ''', (date, country))

    ids = cur.fetchall()
    return ids

### ----- COMMIT AND CLOSE AFTER ALL WORK IS DONE ----- ###
def commit_and_close():
    conn.commit()
    cur.close()

def reset_charts_tables():
    cur.execute('DROP TABLE IF EXISTS viral')
    cur.execute('DROP TABLE IF EXISTS top200')
    create_tables()
    conn.commit()

def reset_features_table():
    cur.execute('DROP TABLE IF EXISTS features')
    create_features_table()
