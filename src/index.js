const path = require('path');
const express = require('express');
const handlebars = require('express-handlebars');
var methodOverride = require('method-override')
const morgan = require('morgan');
const app = express();
const port = 3000;


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

app.use('/coures',bacbaove)

function bacbaove(req,res,next) {
    if(['vethuong','vevip'].includes(req.query.ve)){
        req.face = 'gach gach gach !!!'
        return next()
    }
    res.status(403).json({message: 'Access Denined'})
}

//Template engine
app.engine(
    'hbs',
    handlebars.engine({
        extname: '.hbs',
        helpers: {
            plus(a) {
                return a+1;
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
