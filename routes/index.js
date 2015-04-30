var express = require('express');
var router = express.Router();

var fs = require('fs'),
    html = fs.readFileSync('views/index.ejs');
/* GET home page. */
router.get('/', function(req, res) {
    res.bigpipe.render('index', function(assign){
        var obj = {
            test: "this is words"
        };
        assign(obj);
    });

    res.bigpipe.render('pagelet', {
        text: "the third party"
    }, function(assign) {
        //async coding
        setTimeout(function(){
            assign({
                others: "third type 6000"
            });
        }, 6000);
    });

    res.bigpipe.write("<script>alert('this is a test');</script>");

    res.bigpipe.pagelet('pagelet.eg.js', function(err){
        //this is err handle
        console.log('err', err);
    });

    res.bigpipe.render('pagelet', {
        text: "the third party"
    }, function(assign) {
        //async coding
        setTimeout(function(){
            assign({
                others: "third type 3000"
            });
        }, 3000);
    }).render('pagelet', {
        text: "123321",
        others: "others"
    });

});

module.exports = router;
