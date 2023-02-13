let path = require('path')
// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express()

// configure environment variables
const dotenv = require('dotenv');
dotenv.config();

/* Middleware */
// Configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.json())
app.use(express.static('dist'))

console.log(__dirname)

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})


const geonamesBaseUrl = 'http://api.geonames.org/searchJSON?formatted=true&q=';
app.post('/geonames', async (req, res) => {
    const response = fetch(geonamesBaseUrl + req.body.city + '&username=' + process.env.USER_NAME + '&style=full')
        .then((response) => response.json())
        .then((responseJSON) => {
            let result = responseJSON.geonames
            res.send(result[0]);
        })
        .catch(error => console.log('error', error));
})

//calculate num of days away the trip
function countdown(data) {
    const date = Date.parse(data.date);
    const today = Date.parse(new Date());
    const time = Math.abs(date-today);
    const days = Math.ceil(time / (1000 * 60 * 60 * 24));
    return days;
}

const currentForecastUrl = 'https://api.weatherbit.io/v2.0/current?'
const predictedForecastUrl='https://api.weatherbit.io/v2.0/forecast/daily?'
app.post('/weatherbit', async (req, res) => {
    const data = req.body.data
    const days = countdown(data)
    if (days > 7) {
        const response = fetch(`${predictedForecastUrl}&lat=${data.latitude}&lon=${data.longitude}&key=${process.env.Weatherbit_API_KEY}`)
            .then((response) => response.json())
            .then((responseJSON) => {
                // console.log(responseJSON);
                responseJSON['days']=days
                res.send(responseJSON);
            })
            .catch(error => console.log('error', error));

    } else {
        const response = fetch(`${currentForecastUrl}&lat=${data.latitude}&lon=${data.longitude}&key=${process.env.Weatherbit_API_KEY}`)
            .then((response) => response.json())
            .then((responseJSON) => {
                // console.log(responseJSON);
                responseJSON['days']=days
                res.send(responseJSON);
            })
            .catch(error => console.log('error', error));
    }
})


const PixabayBaseUrl = 'https://pixabay.com/api/?'
app.post('/pixabay', async (req, res) => {
    const response = fetch(`${PixabayBaseUrl}key=${process.env.Pixabay_API_KEY}&q=${req.body.city}&image_type=photo&pretty=true`)
        .then((response) => response.json())
        .then((responseJSON) => {
            // console.log(responseJSON.hits);
            res.send(responseJSON.hits[0]);
        })
        .catch(error => console.log('error', error));
})

module.exports = app
