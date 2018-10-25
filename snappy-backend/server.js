var express = require('express'),
  app = express(),
  cors = require('cors'),
  port = process.env.PORT || 3001,
  mongoose = require('mongoose'),
  Recipient = require('./api/models/recipientsModel'), //created model loading here
  bodyParser = require('body-parser');

app.use(cors());

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/RecipientDB').then(
    (res) => {
        console.log("Connected to Database Successfully.")
    }
    ).catch(() => {
    console.log("Conntection to database failed.");
});; 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./api/routes/recipientsRoutes'); //importing route
routes(app); //register the route

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(port);

console.log('snappy RESTful API server started on: ' + port);
