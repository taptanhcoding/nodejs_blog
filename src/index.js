const path = require('path');
const express = require('express');
const handlebars = require('express-handlebars');
const morgan = require('morgan');
const app = express();
const port = 3000;

const route = require('./routes');

app.use(express.static(path.join(__dirname, 'public/')));

app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());
// HTTP logger
app.use(morgan('combined'));

//Template engine
app.engine(
    'hbs',
    handlebars.engine({
        extname: '.hbs',
    }),
);
               app.set('view engine', 'hbs');

app.set('views', path.join(__dirname, 'resource/views'));
console.log(__dirname);

//Route init
route(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
