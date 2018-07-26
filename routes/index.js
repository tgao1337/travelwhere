var express = require('express');
var router = express.Router();
const request = require('request');

  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');


// const localStorage = require('localStorage');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'GoWhere' });
});

router.get('/result', function(req, res, next) {
  // const laa = localStorage.getItem("testlat");
  // const loo = localStorage.getItem("testlon");
  const laa = localStorage.getItem("37.7735294");
  const loo = localStorage.getItem("-122.4177857");
  const url = `https://www.eventbriteapi.com/v3/events/search/?token=3I5EFIZIDVYYTR4SZ5GD&location.latitude=37.7735294&location.longitude=-122.4177857`;

  // const url = `https://www.eventbriteapi.com/v3/events/search/?token=3I5EFIZIDVYYTR4SZ5GD&location.latitude=${laa}&location.longitude=${loo}`;
  request.get(url, (err, response, body) => {
    if(err) { console.log(err); }
    body = JSON.parse(body);
    let evens = body.events[2].description;
    // console.log(body);
    // console.log("ashuhudashuasdhudashuasdhhuasasasassi");
    res.render('result', {evens: evens});
  });
});

module.exports = router;
