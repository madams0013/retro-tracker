# \~Retro\~ Tracker!

This app allows a user to select a date and it will display the songs from the top 50 viral chart on that particular day that were released more than 20 years before. It shows "old" songs that came back to be popular on the selected day.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

It uses a React.js frontend and a python/Flask backend.

# To Run:
## Clone this repo:

Click the code dropdown on the repo homepage and copy the link

### `git clone {link}`
### `cd retro-tracker`

## Start the Client:

In the project directory, you run:

### `npm install`
### `npm start`

Runs the app.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any errors in the console.

## Start the Server:

In a separate terminal:

from the retro-tracker/ folder

### `cd src/api`
### `flask run`

The server should now be up and running.

Now make your first date selection!

# Future Steps:
* Support more dates
  * The Spotify Charts website doesn't seem to allow scraping anymore, which was my initial approach to accessing viral chart data. Instead, I used a db I had previously stored of the Spotify Charts data of years 2019 and 2020. This is the data that's used for this project. I hope to support more dates as a next step.
* Properly handle authorization
 * Right now I'm not properly handling my client ID and secret, so hiding these is an important next step.
* Display the position of the song
  * Within a song tile, I want to add the position that song held in the charts on that day.
* Conditional dropdown option rendering in the date selectors
  * Add conditional rendering for months with fewer days (so the day dropdown will only show the valid days)
  * Right now selecting an invalid day (ex. February 30) renders "No retro songs on this day :("
* Add support for another top music chart, the top 200 songs, which is different from the viral chart
  * Top 200 songs are the most streamed, while viral is the most shared between people
* Render the release date of a song as Month Day, Year as opposed to year-month-day
