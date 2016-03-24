var request = require('request');
var cheerio = require('cheerio');
var mysql = require('mysql');
var debug = require('debug')('crawler:update');

var db = mysql.createConnection({
	host: "127.0.0.1",
	port: 3306,
	database: 'crawler',
	user: 'root',
	password: 'lkp19911102'
});

db.query('show tables',function(err,tables){
	if(err){
		console.error(err.stack);
	}else{
		console.log(tables);
	}
	db.end();
})