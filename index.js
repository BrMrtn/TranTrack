const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('static'));

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

//Include routing
require('./route/index')(app);

app.use((err, req, res, next) => {
    res.end('There is a problem!');
    console.log(err);
});

app.listen(3000, function () {
    console.log("Running on port 3000");
});