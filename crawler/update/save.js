var async = require("async");
var db = require("../config").db;
var debug = require('debug')('crawler:update:save');


exports.classList = function(list,callback){
	debug('保存文章分类列表到数据库：%d',list.length);

	async.eachSeries(list,function(item,next){
		db.query('SELECT * FROM `class_list` WHERE `id` =? LIMIT 1',[item.id],function(err,data){
			console.log(item);
			if(err)
				return next(err);
			if(Array.isArray(data) && data.length >= 1){
				db.query('UPDATE `class_list` SET `name` =?, `url`=? WHERE `id`=?',[item.name,item.url,item.id],next);
			}else{
				db.query('INSERT INTO `class_list`(`id`,`name`,`url`) VALUES (?,?,?)',[item.id,item.name,item.url],next);
			}
		})
	},callback);
};


exports.articleList = function(class_id,list,callback){
	debug('保存文章列表到数据库中：%d,%d',class_id,list.length);

	async.eachSeries(list,function(item,next){
		db.query('SELECT * FROM `article_list` WHERE `id` =? AND `class_id` =? LIMIT 1',[item.id,class_id],function(err,data){
			if(err)
				return next(err);

			var create_time = new Date(item.time).getTime()/1000;
			if(Array.isArray(data) && data.length >= 1){
				db.query('UPDATE `article_list` SET `title`=?, `url`=?, `class_id`=?, `created_time`=? WHERE `id`=? AND `class_id`=?',[item.title,item.url,class_id,create_time,item.id,class_id],next);
			}else{
				db.query('INSERT INTO `article_list` (`id`,`title`,`url`,`class_id`,`created_time`) VALUES (?,?,?,?,?)',[item.id,item.title,item.url,class_id,create_time],next);
			}
		})
	},callback)
}

exports.articleCount = function(class_id,count,callback){
	db.query('UPDATE `class_list` SET `count`=? WHERE `id`=?',[count,class_id],callback);
}

exports.articleTags = function(id,tags,callback){
	debug('保存文章标签：%s,%s',id,tags);

	db.query('DELETE FROM `article_tag` WHERE `id`=?',[id],function(err){
		if(err)
			return callback(err);
		if(tags.length > 0){
			var values = tags.map(function(tag){
				return '(' + db.escape(id) + ', ' +db.escape(tag) + ')';
			}).join(',');

			db.query('INSERT INTO `article_tag`(`id`,`tag`) VALUES(?,?)',[id,values],callback)
		}else{
			callback(null);
		}
	})
}

exports.articleDetail = function(id,tags,content,callback){
	debug('保存文章内容：%s',id);

	db.query('SELECT `id` FROM `article_detail` WHERE `id`=?',[id],function(err,data){
		if(err)
			return callback(err);
		tags = tags.join(' ');

		if(Array.isArray(data) && data.length >= 1){
			db.query('UPDATE `article_detail` SET `tags`=?,`content`=? WHERE `id`=?',[tags,content,id],callback)
		}else{
			db.query('INSERT INTO `article_detail`(`id`,`tags`,`content`) VALUES (?,?,?)',[id,tags,content],callback);
		}
	})
}

exports.isArticleExists = function(id,callback){
	db.query('SELECT `id` FROM `article_detail` WHERE `id`=?',[id],function(err,data){
		if(err)
			return callback(err);
		callback(null,Array.isArray(data) && data.length >= 1);
	})
}

















