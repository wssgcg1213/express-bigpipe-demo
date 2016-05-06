var express = require('express');
var router = express.Router();

var fs = require('fs'),
    html = fs.readFileSync('views/index.ejs');
/* GET home page. */
router.get('/', function(req, res) {
    res.bigpipe
        
        .render('index', function(assign){
            assign({ title: 'Hello World!'});
        })
        
        .pagelet('pagelet.eg.js', function(err){
            //this is err handle
            console.log('err', err);
        })
        
        .render('pagelet', {
            text: "<h2>This is a rendered pagelet</h2>"
        })
        
        .render('pagelet', function(assign) {
            //async coding
            setTimeout(function(){
                assign({ text: "<h2>This message is assigned 3s later</h2>" });
            }, 3000);
        })
        
        .render('pagelet', function(assign) {
            //async coding
            setTimeout(function(){
                assign({ text: "<h2>This message is assigned 1s later</h2>" });
            }, 1000);
        })
        
        .render('pagelet', function(assign) {
            //async coding
            setTimeout(function(){
                assign({ text: "<h2>This message is assigned 2s later</h2>" });
            }, 2000);
        })
        
        .write('<script>__bigpipe_call__("<h2>This is directly write.</h2>")</script>')
});

module.exports = router;
