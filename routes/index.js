var express = require('express');
var router = express.Router();
const request = require('request');
var rp = require('request-promise');



const googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyCm7431yy5TSXfJZqPpGrO4GURTLObIMj8',
  Promise: Promise
});

var ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');

var toneAnalyzer = new ToneAnalyzerV3({
    version: '2017-09-21',
    username: '1303e77d-30f2-4412-b7ea-e6988507e082',
    password: 'E1lMbWHPLsg8',

    use_vcap_services: false,
    url: 'https://gateway.watsonplatform.net/tone-analyzer/api'
  });

// var http = require("http");
// setInterval(function() {
//   http.get("https://blooming-beach-60917.herokuapp.com");
// }, 150000);

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
      let x = Math.floor(Math.random() * body.events.length);
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

      var toneParams = {
        'tone_input': { 'text': distext },
        // 'tone_input': { 'text': "a string." },

        'content_type': 'application/json'
      };

      var event = {name: nametext, description: distext, eventurl:erl, picurl:picurl, start: starttime, end: endtime, free: freestring};


      toneAnalyzer.tone(toneParams, function (error, toneAnalysis) {
        if (error) {
          console.log(error);
        } else {
          // console.log(JSON.stringify(toneAnalysis, null, 2));
          // var ton = JSON.stringify(toneAnalysis, null, 2);
          // var toe = JSON.parse(toneAnalysis);
          var ta = toneAnalysis;
          // var tonelist;
          // console.log(ta.document_tone);
          // if(ton["document_tone"]!== "undefined"){console.log(ton["document_tone"]["tones"].length);}
          if (!Array.isArray(ta.document_tone.tones) || !ta.document_tone.tones.length) {
          //   asd
            console.log("nothings is here");
            // return("nothing return");
            res.render('result', { event: event , title: 'GoWhere'  });

          }
          else{
            console.log("something is here");
            var tonelisttwo = ta.document_tone.tones;
          //   console.log("nothing");
            // return("something return");
            res.render('result0', { event: event , tone: tonelisttwo });

          }

        }
      });
      // console.log(tonelist);

      // var event = {name: nametext, description: distext, eventurl:erl, picurl:picurl, start: starttime, end: endtime, free: freestring};

      // res.render('result', { event: event , title: 'GoWhere' });

    }).catch(function(err) {
      console.error(err);
    });


  })
  .catch((err) => {
    console.log(err);
  });

});

module.exports = router;
