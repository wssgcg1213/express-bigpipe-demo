#PipeBig
-------

express' bigpipe Middleware.


###usage: 
	
本中间件的 namespace 在 res.bigpipe 下, 所有方法都支持链式调用, 输出完成后自动触发```res.end()```结束请求.


####```write(str);```

直接输出


####```pagelet(file, errHandler);```

读取basedir下的file文件, 第二个参数为错误处理回调, 传入参数err


####```render(view, renderObj, callback);```

使用模板引擎读取模板目录下模板, renderObj 为渲染的数据, callback回调采用尾触发, 传入一个参数assign, 在callback中异步获取到数据之后使用assign(obj) 将数据合并入renderObj并渲染输出.

该方法可用的重载: 

```render(view, renderObj);```

```render(view, callback);```



####```done(fn);```, ```done(str);```

提前结束, 相当于 res.end , 可以传入 String 直接输出, 或者回调函数在 res.end 之前执行.

###demo:

```javascript
var app = require('express')(),
	bigpipe = require('./bigpipe');
	
//...
	
app.use(bigpipe({						 //use中间件
	basedir: __dirname + '/public/'     //设定bigpipe的pagelet路径
}));

app.get("/", function(req, res){
	 res.bigpipe.write("<script>alert('this is a test');</script>"); //直接write
	 
	 res.bigpipe.pagelet('pagelet.eg.js', function(err){  //使用pagelet读取basedir下的文件, 第二个参数为错误处理
         //this is err handle
         console.log('err', err);
     });
	 
	 res.bigpipe.render('pagelet', {
         text: "this is a rendered data"
         
     }, function(assign) {
         //async coding
         
         setTimeout(function(){
             assign({
                 anotherData: "3000ms 后输出"
             });
         }, 3000);
         
     }).render('pagelet', {
         text: "123321",
         others: "others"
     });

});

```




by Ling created @ 2015年04月29日21:10:36  
mailto i@zeroling.com  
[zeroling.com](zeroling.com)
