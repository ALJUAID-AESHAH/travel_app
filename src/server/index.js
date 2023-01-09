var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const dotenv = require('dotenv');
dotenv.config();
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json())
app.use(express.static('dist'))

console.log(__dirname)
// console.log(`Your API key is ${process.env.API_KEY}`);

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
    // res.sendFile(path.resolve('src/client/views/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})

app.post('/test', async (req, res) => {
    let type = '';
    let urlRegex = /^(ftp|http|https):\/\/[^ "]+$/
    urlRegex.test(req.body.data) ? type = "url" : type = "txt"
    
    const formdata = new FormData();
    formdata.append("key", process.env.API_KEY);
    formdata.append(type, req.body.data);
    formdata.append("lang", "en");

    const requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    };
    const response = fetch("https://api.meaningcloud.com/sentiment-2.1", requestOptions)
        .then((response) => response.json())
        .then((responseJSON) => {
            res.send(responseJSON);
        })
        .catch(error => console.log('error', error));

})
