
var express = require('express');
var router = express.Router();



router.get('/', function(req, res){
    res.render('../view/index.ejs', { title: 'Index!' });
})

router.post('/sign_in', function(req, res){
    res.send('sign in!');
});

router.post('/sign_up', function(req, res){
    res.send('sign up!');
});

module.exports = router;