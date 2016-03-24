var originRequest = require('request');
var cheerio = require('cheerio');
var debug = require('debug')('crawler:update:read');

function request(url,callback){
	originRequest(url,callback);
}

exports.classList = function(url,callback){
	debug('读取文章分类列表：%s',url);

	request(url,function(err,res){
		if(err)
			return callback(err);

		var $ = cheerio.load(res.body.toString());

		var classList = [];
		$(".classList li a").each(function(){
			var $me = $(this);
			var item = {
				name: $me.text().trim(),
				url: $me.attr('href')
			};

			var s = item.url.match(/articlelist_\d+_(\d+)_\d\.html/);
			if(Array.isArray(s)){
				item.id = s[1];
				classList.push(item);
			}
		});

		callback(null,classList);
	})
}


exports.articleList = function(url,callback){
	debug('读取博文列表：%s',url);

	request(url,function(err,res){
		if(err)
			return callback(err);
		var $ = cheerio.load(res.body.toString());

		var articleList = [];
		$(".articleList .articleCell").each(function(){
			var $me = $(this);
			var $title = $me.find(".atc_title a");
			var $time = $me.find(".atc_info .atc_tm");
			var item = {
				title: $title.text().trim(),
				url: $title.attr('href'),
				time: $time.text().trim()
			};

			var s = item.url.match(/blog_([a-zA-Z0-9]+)\.html/);
			if(Array.isArray(s)){
				item.id = s[1];
				articleList.push(item);
			}
		});
		var nextUrl = $(".SG_pgnext a").attr("href");
		if(nextUrl){
			exports.articleList(nextUrl,function(err,articleList2){
				if(err)
					return console.log(err);
				callback(null,articleList.concat(articleList2));
			})
		}else{
			callback(null,articleList);
		}
	})
}


exports.articleDetail = function(url,callback){
	debug('读取博文内容：%s',url);

	request(url,function(err,res){
		if(err)
			return callback(err);
		var $ = cheerio.load(res.body.toString());

		var tags = [];
		$(".blog_tag h3 a").each(function(){
			var tag = $(this).text().trim();
			if(tag){
				tags.push(tag);
			}
		});

		var content = $(".articalContent").html().trim();
		callback(null,{tags: tags,content:content});
	})
}