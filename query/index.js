const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const postsWithComments = [];

app.get('/posts', (req, res) => {
    res.send(postsWithComments);
})

app.post('/events', (req, res) => {

})