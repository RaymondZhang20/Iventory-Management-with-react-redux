var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/defaultImg', (req, res) => {
  res.sendFile('D:/UBC/CPSC455/myapp/server/images/default.png');
});

module.exports = router;
