/**
 * Created by Liuchenling on 4/30/15.
 */
var fs = require('fs');

function ext(str){
    var arr = str.split('.');
    return arr[arr.length - 1];
}

function PipeBig(opts){
    opts = typeof opts === 'object' ? opts : {};
    opts.basedir = opts.basedir || __dirname;

    return function(req, res, next){
        var bigpipe = res.bigpipe = {}; //namespace
        bigpipe.bigpipedCount = 0;
        bigpipe.render = function(view, renderObj, fn) {
            bigpipe.bigpipedCount++;
            if(arguments.length === 2 && typeof renderObj === 'function'){ //第二个参数为fn
                fn = renderObj;
                renderObj = {};
            }else if(arguments.length === 2 && typeof renderObj === 'object'){ //第二个参数为obj
                fn = function(assign){
                    assign(renderObj);
                };
            }

            fn.call(res, function(obj) {
                for(var i in renderObj){
                    if(renderObj.hasOwnProperty(i)){
                        obj[i] = renderObj[i];
                    }
                }

                res.render(view, obj, function(err, str){
                    if (err) {
                        console.log(err);
                        return res.req.next(err);
                    }
                    res.write(str);
                    setImmediate(function(){
                        if(--bigpipe.bigpipedCount === 0){
                            bigpipe.done();
                        }
                    });
                });
            });

            return bigpipe;
        };

        bigpipe.write = function(){
            bigpipe.bigpipedCount++;
            res.write.apply(res, arguments);
            setImmediate(function(){
                if(--bigpipe.bigpipedCount === 0){
                    bigpipe.done();
                }
            });
            return bigpipe;
        }

        bigpipe.pagelet = function(file, callback) {
            bigpipe.bigpipedCount++;
            fs.readFile(opts.basedir + file, function(err, content){
                if(err) return callback(err);
                switch(ext(file)) {
                    case 'js':
                        content = "<script>" + content + "</script>"; break;
                    case 'css':
                        content = "<style>" + content + "</style>"; break;
                }
                res.write(content);
                setImmediate(function(){
                    if(--bigpipe.bigpipedCount === 0){
                        bigpipe.done();
                    }
                });
            });
            return bigpipe;
        };

        bigpipe.done = function(fn){
            if(typeof fn === 'function')
                fn.call(res);
            if(typeof fn === 'string')
                return res.end(fn);

            res.end();
        }

        next();
    };
}


module.exports = PipeBig;