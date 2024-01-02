let express = require('express');
let app = express();
require('dotenv').config();
let bodyParser = require('body-parser');

// console.log('Hello World');

app.use('/public', express.static(__dirname + '/public'));

app.use((req, res, next) => {
 console.log(`${req.method} ${req.path} - ${req.ip}`);
 next();
});

app.use(bodyParser.urlencoded({extended: false}));

// app.get('/', (req, res) => {
//  res.send('Hello Express');
// });

app.get('/', (req, res) => {
 res.sendFile(__dirname + '/views/index.html');
});

app.get('/json', (req, res) => {
 let message = 'Hello json';
 if (process.env.MESSAGE_STYLE === 'uppercase') {
  message = message.toUpperCase();
 }
 res.json({message: message});
});

app.get('/now', (req, res, next) => {
 req.time = new Date().toString();
 next();
}, (req, res) => {
 res.json({time: req.time});
});

app.get('/:word/echo', (req, res) => {
 res.json({echo: req.params.word});
});

const handlerGetName = (req, res) => {
 let firstname = req.query.first || '';
 let lastname = req.query.last || '';
 res.json({name: `${firstname} ${lastname}`.trim()});
};

// app.route('/name').get(handlerGetName).post(handlerGetName);

app.get('/name').get(handlerGetName);

app.post('/name', (req, res) => {
 let firstname = req.body.first || '';
 let lastname = req.body.last || '';
 res.json({name: `${firstname} ${lastname}`.trim()});
});

module.exports = app;
