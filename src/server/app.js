const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require("express-session");
const LocalStrategy = require('passport-local').Strategy;
const path = require('path');
const cors = require('cors');
const app = express();
const ews = require('express-ws')(app);
const WS = require('ws');

const items = require('./db/items')

const authApi = require('./routes/auth-api');
const Users = require('./db/users');

//Default users
Users.createUser('Admin', '2');
Users.createUser("Joakim", "1234");
Users.createUser("Jon", "4321");
Users.createUser("Brage", "111111");
Users.createUser("Andrea", "andrea123");


if (false) {
    console.log('Using CORS to allow all origins');
    app.use(cors());
}

app.use(bodyParser.urlencoded({ extended: true }));


app.use(bodyParser.json());


app.ws('/', function (socket, req) {
    console.log('Established a new WS connection');

});



//////////////////////////////////////////////items


app.get('/api/items', (req, res) => {

    res.json(items.getAllItems());
});

app.get('/api/items/:id', (req, res) => {
    const item = items.getItem(req.params["id"]);

    if (!item){
        res.status(404);
        res.send();
    } else {
        res.json(item)
    }

});

app.delete('/api/items/:id', (req, res) => {
    const deleted = items.deleteItem(req.params.id);
    if (deleted){
        res.status(204);
    } else {
        res.status(404);
    }

    res.send();
});

app.post('/api/items', (req, res) => {

    const dto = req.body;

    const id = items.createNewItem(dto.name, dto.description, dto.startingPrice, dto.highestBid);
    res.status(201);
    res.header("location", "api/items/" + id);
    res.send();

});

app.put('/api/items/:id', (req, res) => {
    if (req.params.id !== req.body.id){
        res.status(409);
        res.send();
        return;
    }

    const updated = items.updateItem(req.body);

    if (updated){
        res.status(204);
    } else {
        res.status(404);
    }

    res.send();
});

app.all('/api/items/*', (req,res) => {
    res.status(404);
    res.send();
});


//////////////////////////////////////////////items-end



app.use(session({
    secret: 'a secret used to encrypt the session cookies',
    resave: false,
    saveUninitialized: false
}));


app.use(express.static('public'));





passport.use(new LocalStrategy(
    {
        usernameField: 'userId',
        passwordField: 'password'
    },
    function (userId, password, done) {

        const ok = Users.verifyUser(userId, password);

        if (!ok) {
            return done(null, false, {message: 'Invalid username/password'});
        }

        const user = Users.getUser(userId);
        return done(null, user);
    }
));


passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {

    const user = Users.getUser(id);

    if (user) {
        done(null, user);
    } else {
        done(null, false);
    }
});





app.use(passport.initialize());
app.use(passport.session());


//--- Routes -----------
app.use('/api', authApi);


//handling 404
app.use((req, res, next) => {
    res.sendFile(path.resolve(__dirname, '..', '..', 'public', 'index.html'));
});

module.exports = {app};
