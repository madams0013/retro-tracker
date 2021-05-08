# \~Retro\~ Tracker!

This app allows a user to select a date and it will display the songs from the top 50 viral chart on that particular day that were released more than 20 years before. It shows "old" songs that came back to be popular on the selected day.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# To Run:
## Start the Client:

In the project directory, you run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## Start the Server:

In a separate terminal from the retro-tracker/ folder:

### `cd src/api`
### `flask run`

The server should now be up and running.

Now make your first date selection!

# Future Steps:
* Support more dates
  * The Spotify Charts website doesn't seem to allow scraping anymore, which was my initial approach to accessing viral chart data. Instead, I used a db I had previously stored of the Spotify Charts data of years 2019 and 2020. This is the data that's used for this project. I hope to support more dates as a next step.
* Display the position of the song
  * Within a song tile, I want to add the position that song held in the charts on that day
* Conditional dropdown option rendering in the date selectors
  * Add conditional rendering for months with fewer days (so the day dropdown will only show the valid days)
* Add support for another top music chart, the top 200 songs, which is different from the viral chart
  * Top 200 songs are the most streamed, while viral is the most shared between people
* Render the release date of a song as Month Day, Year as opposed to year-month-day
