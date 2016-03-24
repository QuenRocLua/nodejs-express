var path = require('path');
var express = require('express');
var read = require('./Web/read');
var config = require('./config');

var app = express();

app.set('views',__dirname+'/views');
app.set('view engine','ejs');
app.use('/public',express.static(path.join(__dirname,'public')));

app.get('/',function(req,res,next){
	read.articleListByClassId(0,0,20,function(err,list){
		if(err)
			return next(err);

		res.locals.articleList = list;
		res.render('index');
	});
});

app.get('/article/:id',function(req,res,next){
	read.article(req.params.id,function(err,article){
		if(err)
			return next(err);

		res.locals.article = article;
		res.render('article');
	})
})

app.listen(config.port);
console.log('服务器已启动');