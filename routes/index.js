var express = require('express');
var router = express.Router();
const request = require('request');
var rp = require('request-promise');

  // var LocalStorage = require('node-localstorage').LocalStorage;
  // localStorage = new LocalStorage('./scratch');


// const localStorage = require('localStorage');
const googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyCm7431yy5TSXfJZqPpGrO4GURTLObIMj8',
  Promise: Promise
});
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'GoWhere' });
});

router.post('/', function(req, res, next) {
  // console.log(req.body);
  let latc = req.body.loc;
  googleMapsClient.geocode({address: latc})
  .asPromise()
  .then((response) => {
    console.log(response.json.results[0]["geometry"].location.lat);
    console.log(response.json.results[0]["geometry"].location.lng);
    // send to the eventbriteapi!
  })
  .catch((err) => {
    console.log(err);
  });
  // let url = 'https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyCm7431yy5TSXfJZqPpGrO4GURTLObIMj8';
  // console.log(latc);
  // var options = { method: 'POST',
  //   url: 'http://maps.googleapis.com/maps/api/geocode/json',
  //   body:
  //   {
  //     "address": latc,
  //     "key":"AIzaSyCm7431yy5TSXfJZqPpGrO4GURTLObIMj8"
  //   },
  // //   headers: {
  // //   },
  //   json: true };
  //
  // rp(options).then(function(body) {
  //   // console.log(body);
  //   var latte = body.results[0]["geometry"].location.lat;
  //   // if (matchString == "match") match = true;
  //
  //   console.log(latte);
  //   // console.log(match);
  // }).catch(function(err) {
  //   console.error(err);
  // });
  // let x = Math.floor(Math.random() * 50);
  // console.log(x);
  // let url = `https://www.eventbriteapi.com/v3/events/search/?token=3I5EFIZIDVYYTR4SZ5GD&location.latitude=${laa}&location.longitude=${loo}`;
  // console.log(url);
  // let url = 'https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyCm7431yy5TSXfJZqPpGrO4GURTLObIMj8';
  // fetch(url).then((res) => {
  //   return res.json();
  // }).then((text) => {
  //   console.log(text.results[0].geometry.location.lat);
  //   // let nametext = text.events[x]["name"].text;
  //
  // }).catch((err) => {
  //   console.log(err);
  // });
res.render('index', { title: "test" });

});

module.exports = router;
