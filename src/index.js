const path = require('path');
const express = require('express');
const handlebars = require('express-handlebars');
var methodOverride = require('method-override')
const morgan = require('morgan');
const app = express();
const port = 3000;

const SortMiddleware = require('./app/middlewares/SortMiddleware')

const route = require('./routes');
const db = require('./config/db')

//Connect db

db.connect()

app.use(express.static(path.join(__dirname, 'public/')));

app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());
// HTTP logger
app.use(morgan('combined'));

app.use(methodOverride('_method'))

app.use(SortMiddleware)


//Template engine
app.engine(
    'hbs',
    handlebars.engine({
        extname: '.hbs',
        helpers: {
            plus(a) {
                return a+1;
            },
            sortable(field, sort) {
                const sortType = field === sort.column ? sort.type : 'default';
                let icons = {
                    default : 'fa-solid fa-sort',
                    desc : 'fa-solid fa-arrow-down-wide-short',
                    asc : 'fa-solid fa-arrow-down-short-wide'
                }
                let types = {
                    default : 'desc',
                    asc : 'default',
                    desc : 'asc'
                }
                return `<a href="?_sort&column=${field}&type=${types[sortType]}"><i class='${icons[sortType]}'></i></a>`
            }
        }
    }),
);
app.set('view engine', 'hbs');

app.set('views', path.join(__dirname, 'resource','views'));
console.log(__dirname);

//Route init
route(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
