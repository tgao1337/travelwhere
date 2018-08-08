var express = require('express');
var router = express.Router();
const request = require('request');
var rp = require('request-promise');


const googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyCm7431yy5TSXfJZqPpGrO4GURTLObIMj8',
  Promise: Promise
});
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'GoWhere' });
});

router.post('/', function(req, res, next) {

  let latc = req.body.loc;
  googleMapsClient.geocode({address: latc})
  .asPromise()
  .then((response) => {
     let lat = response.json.results[0]["geometry"].location.lat;
     let lng = response.json.results[0]["geometry"].location.lng;
    var location = {lat: lat, lng: lng};

    return location;
  })
  .then((locationresponse) => {

    let laa = locationresponse.lat;
    let loo = locationresponse.lng;

    var options = { method: 'GET',
      url: 'https://www.eventbriteapi.com/v3/events/search/',
      body:
       {
         "location":
          { "latitude": laa,
            "longitude":  loo
          }
          },
      headers: {
          "Authorization":"Bearer 3I5EFIZIDVYYTR4SZ5GD"
      },
      json: true };
    rp(options).then(function(body) {
      let x = Math.floor(Math.random() * 50);
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

      res.render('result', { event: event , title: 'GoWhere' });

    }).catch(function(err) {
      console.error(err);
    });


  })
  .catch((err) => {
    console.log(err);
  });

});

module.exports = router;
