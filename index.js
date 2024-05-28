const express = require('express');
const app = express();
const session = express('express-session');
const bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(express.static('static'));

app.use(session({
    secret: 'secret'
}));

//Include routing
require('./route/index')(app);

app.use(function (req, res, next) {
    res.tpl = {};
    res.tpl.error = [];
    return next();
});

app.use((err, req, res, next) => {
    res.end('There is a problem!');
    console.log(err);
});

const server = app.listen(3000, function () {
    console.log("Running on port 3000");
});