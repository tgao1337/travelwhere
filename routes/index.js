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
    // console.log(response.json.results[0]["geometry"].location.lat);
    // console.log(response.json.results[0]["geometry"].location.lng);
     let lat = response.json.results[0]["geometry"].location.lat;
     let lng = response.json.results[0]["geometry"].location.lng;
    // let latlng [];
    var location = {lat: lat, lng: lng};

    // send to the eventbriteapi!
    return location;
  })
  .then((locationresponse) => {
    // console.log(locationresponse.lat);
    // console.log(locationresponse.lng);

    let laa = locationresponse.lat;
    let loo = locationresponse.lng;
    // let url = `https://www.eventbriteapi.com/v3/events/search/?token=3I5EFIZIDVYYTR4SZ5GD&location.latitude=${laa}&location.longitude=${loo}`;
    // console.log(url);

    var options = { method: 'GET',
      url: 'https://www.eventbriteapi.com/v3/events/search/',
      body:
       {
         "location":
         // "token":"3I5EFIZIDVYYTR4SZ5GD",
         // "location.latitude": laa,
         // "location.longitude": loo
          { "latitude": laa,
            "longitude":  loo
          }
          },
      headers: {
          "Authorization":"Bearer 3I5EFIZIDVYYTR4SZ5GD"
      },
      json: true };
      // options = JSON.stringify(options);
    rp(options).then(function(body) {
      let x = Math.floor(Math.random() * 50);
      // console.log(body.events[x]["name"].text);
      let nametext = body.events[x]["name"].text;
      let distext = body.events[x]["description"].text;
      let erl = body.events[x]["url"];
      let picurl = body.events[x]["logo"].url;
      let starttime = body.events[x]["start"].local;
      let endtime = body.events[x]["end"].local;
      let isfree = body.events[x]["is_free"];
      let freestring = 'This is not a free event.';
      if(isfree) {
        freestring = 'This event is free.';
      }
      else {
        freestring = 'This is not a free event.';
      }

      var event = {name: nametext, description: distext, eventurl:erl, picurl:picurl, start: starttime, end: endtime, free: freestring};
      // var matchString = body.Record.RecordStatus;
      // if (matchString == "match") match = true;
      // console.log(body.Record.RecordStatus);
      // console.log(match);
      // console.log(body);
      res.render('result', { event: event , title: 'GoWhere' });
      // res.redirect('/');
    }).catch(function(err) {
      console.error(err);
    });


  })
  .catch((err) => {
    console.log(err);
  });

});
// router.get('/result', function(req, res, next) {
//   console.log(req);
//   res.render('result', {  });
// });
module.exports = router;
