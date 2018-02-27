var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/eval/:expression', function(req,res){
  
  var queryString=req.params.expression;
  var encode=queryString.replace("div", "/");
  var response= eval(encode);

  //res.writeHead(200, {"Content-Type": "text/plain"});
  res.send(JSON.stringify(response));
});
module.exports = router;
