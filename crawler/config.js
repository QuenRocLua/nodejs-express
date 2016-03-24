var mysql = require('mysql');
var spawn = require('child_process').spawn;
var cronJob = require('cron').CronJob;

exports.db = mysql.createConnection({
	host: "127.0.0.1",
	port: 3306,
	database: 'crawler',
	user: 'root',
	password: 'lkp19911102'
});

exports.sinaBlog = {
	url: 'http://blog.sina.com.cn/u/1776757314'
};

exports.port = 3000;

exports.autoUpdate = '* */30 * * *';

var job = new cronJob(exports.autoUpdate,function(){
	console.log('开始执行定时更新任务');
	var update = spawn(process.execPath, [path.resolve(__dirname, 'update/all.js')]);

	update.stdout.pipe(process.stdout);
	update.stderr.pipe(process.stderr);
	update.on('close',function(code){
		console.log('更新任务结束，代码=%d',code);
	});
});
job.start();
process.on('uncaughtException',function(err){
	console.error('uncaughtException: %s',err.stack);
})

