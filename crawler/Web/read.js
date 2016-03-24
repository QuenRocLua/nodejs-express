var async = require('async');
var db = require('../config').db;
var debug = require('debug')('crawler:web:read');

exports.classList = function(callback){
	debug('获取文章列表');

	db.query('SELECT * FROM `class_list` ORDER BY `id` ASC',callback);
}

exports.isClassExists = function(id,callback){
	debug('检查分类是否存在：%s',id);

	db.query('SELECT * FROM `class_list` WHERE `id`=? LIMIT 1',[id],function(err,ret){
		if(err){
			return next(err);
		}
		callback(null, Array.isArray(ret)&&ret.length > 0);
	});
}

exports.class = function(id,callback){
	debug('获取指定分类的信息： %s',id);

	db.query('SELECT * FROM `class_list` WHERE `id`=? LIMIT 1',function(err,list){
		if(err){
			return callback(err);
		}

		if(!(list.length) > 0){
			return callback(new Error('该分类不存在'));
		}
		callback(null,list[0]);
	});
}

exports.article = function(id,callback){
	debug('获取指定文章的详细信息：%s',id);

	var sql = 'SELECT * FROM `article_list` AS `A`' + ' LEFT JOIN `article_detail` AS `B` ON `A`.`id`=`B`.`id`' + ' WHERE `A`.`id`=? LIMIT 1';

	db.query(sql,[id],function(err,list){
		if(err) return callback(err);
		if(!(list.length) > 0) return callback(new Error('该文章不存在'));

		callback(null,list[0]);
	})
}

exports.articleListByClassId = function(classId,offset,limit,callback){
	debug('获取指定分类下的文章列表:%s,%s,%s',classId,offset,limit);

	var sql = 'SELECT * FROM `article_list` AS `A`' + ' LEFT JOIN `article_detail` AS `B` ON `A`.`id`=`B`.`id`' + ' WHERE `A`.`class_id`=?'+' ORDER BY `created_time` DESC LIMIT ?,?';

	db.query(sql,[classId,offset,limit],callback);
}


exports.articleListByTag = function(tag,offset,limit,callback){
	debug('获取指定标签下的文章列表：%s,%s,%s',tag,offset,limit);

	var sql = 'SELECT * FROM `article_list` WHERE `id` IN ('+' SELECT `id` FROM `article_tag` WHERE `tag`=?)' + ' ORDER BY `created_time` DESC LIMIT ?,?';

	db.query(sql,[tag,offset,limit],callback);
}

exports.articleCountByTag = function(tag,callback){
	debug('获取指定标签下的文章数量：%s',tag);

	db.query('SELECT COUNT(*) AS `c` FROM `article_tag` WHERE `tag`=?',[tag],function(err,ret){
		if(err) return callback(err);
		callback(null,ret[0].c);
	})
}












