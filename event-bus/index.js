const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

const events = [];

app.post('/events', (req, res) => {
    const event = req.body;

    events.push(event);

    axios.post('http://localhost:4000/events', event).catch((error) => console.log('Could not reach post service'));
    axios.post('http://localhost:4001/events', event).catch((error) => console.log('Could not reach comments service'));
    axios.post('http://localhost:4002/events', event).catch((error) => console.log('Could not reach query service'));
    axios.post('http://localhost:4003/events', event).catch((error) => console.log('Could not reach moderation service'));

    res.send({status: 'OK'});
});

app.get('/events', (req, res) => {
    res.send(events);
})

app.listen(4005, ()=> {
    console.log('Event Bus is listening on port 4005')
})