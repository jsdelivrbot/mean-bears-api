var express = require('express');
var bodyParser = require('body-parser');
var cool = require('cool-ascii-faces');
var mongoose = require('mongoose').set('debug', false);
var Bear = require('./app/models/bear');
var app = express();
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;

// connect to db url in config
mongoose.connect(process.env.MONGODB_URI, function (err, db) {
    if (err)
        console.warn('!!! ' + err);
    else
        console.log('Connected to remote MongoDB... Awesome!');
});


// configure body parser
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());


// set port from config
app.set('port', (process.env.PORT || 5000));


// views is directory for all template files
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


// set index page
app.get('/', function (request, response) {
    response.render('pages/index');
});

// set db page
app.get('/db', function (request, response) {
    response.render('pages/db');
});

// TODO: create a separate endpoint for each front end framework

// endpoint that uses angularjs for showcasing bear api
app.get('/angular', function (request, response) {
    response.sendFile(__dirname + '/views/pages/angular.html');
});

// endpoint that uses angularjs for showcasing bear api
app.get('/react', function (request, response) {
    response.sendFile(__dirname + '/views/pages/react.html');
});

// listen on the port number specified in the config file
app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});


// sample uri without using route
app.get('/cool', function (request, response) {
    response.send(cool());
});


// middleware to use for all requests
router.use(function (req, res, next) {
//        console.log('Processing...');
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// ----------------
// TODO:
// Add a front end
// Add grunt/gulp build script
// ----------------

// create a bear (accessed at POST /api/bears)
// ----------------------------------------------------
router.route('/bears').post(function (req, res) {
    var bear = new Bear();
    var newID = new ObjectID();

    bear.name = req.body.name;
    bear.rating = req.body.rating || 0;
    bear._id = newID;

    // TODO: set the unique key to bear.name
    bear.save(function (err) {
        if (err)
            res.send(err);
        else {
            // after we save the bear to the database, include in response.
            Bear.findById(bear._id, function (err, bear) {
                res.json({
                    message: 'A new bear has been added to the Amazing Bear Database!',
                    bear: bear
                });
            });
        }
    });
});

// get bears (accessed at GET /api/bears)
// ----------------------------------------------------
router.route('/bears').get(function (req, res) {
    // if we dont have query parameters, just get all the bears
    if (Object.keys(req.query).length > 0) {
        Bear.find(req.query, function (err, bears) {
            if (err)
                res.send(err);

            var msg = (bears.length < 1) ? "No bears were found." :
                'The bear search was successful, ' + bears.length + ' found.';
            res.json({
                message: msg,
                query: req.query,
                bears: bears
            });
        });
    } else {
        Bear.find(function (err, bears) {
            if (err)
                res.send(err);

            res.json({
                message: 'There are ' + bears.length + ' bears in the Amazing Bear Database.',
                bears: bears
            });
        });
    }
});

// get a single bear (accessed at GET /bears/:bear_id)
// ----------------------------------------------------
router.route('/bears/:bear_id').get(function (req, res) {
    // get the bear with that id
    Bear.findById(req.params.bear_id, function (err, bear) {
        if (err)
            res.send(err);
        res.json(bear);
    });
});

// update a bear (accessed at PUT /bears/:bear_id)
// ----------------------------------------------------
router.route('/bears/:bear_id').put(function (req, res) {
    // update the bear with this id
    Bear.findById(req.params.bear_id, function (err, bear) {

        if (err)
            res.send(err);
        else {
            bear.name = req.body.name;
            bear.rating = req.body.rating;
            bear.save(function (err) {
                if (err)
                    res.send(err);

                res.json({
                    message: 'Bear updated!',
                    bear: bear
                });
            });
        }
    });
});

// delete a bear (accessed at DELETE /bears/:bear_id)
// ----------------------------------------------------
router.route('/bears/:bear_id').delete(function (req, res) {
    // delete the bear with this id
    var deadBear = {};
    Bear.findById(req.params.bear_id, function (err, bear) {
        if (err)
            res.send(err);
        else {
            deadBear = bear;

            Bear.remove({
                _id: req.params.bear_id
            }, function (err, result) {
                if (err)
                    res.send(err);
                if(bear !== null)
                    res.json({
                        message: 'Successfully deleted ' + bear.name + '. I hope you are happy',
                        deadBear: bear
                    });
                else
                    res.json({message:'Deleted questionable bear.'});
            });
        }
    });
});


app.use('/api', router); // register our routes LAST
