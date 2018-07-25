var express = require('express');
var router = express.Router();
const request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
  const url = "https://www.eventbriteapi.com/v3/events/search/?token=3I5EFIZIDVYYTR4SZ5GD&location.latitude=37.7735294&location.longitude=-122.4177857";
  request.get(url, (err, response, body) => {
    if(err) { console.log(err); }
    body = JSON.parse(body);
    console.log(body);
  });
  res.render('index', { title: 'TravelWhere' });
});

module.exports = router;
