var mongodb = require('./db');
var markdown = require('markdown').markdown;

function Post(name,head,title,tags,post){
	this.name = name;
	this.head = head;
	this.title = title;
	this.post = post;
	this.tags = tags;
}

module.exports = Post;

Post.prototype.save = function(callback){
	var date = new Date();

	var time = {
		date: date,
		year: date.getFullYear(),
		month: date.getFullYear() + "-" + (date.getMonth() + 1),
		day: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
		minute: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + (date.getMinutes() < 10 ? '0'+date.getMinutes():date.getMinutes())
	}

	var post = {
		name: this.name,
		head: this.head,
		time: time,
		title: this.title,
		post: this.post,
		tags: this.tags,
		comments: [],
		pv: 0
	}

	mongodb.open(function(err,db){
		if(err){
			return callback(err);
		}

		db.collection('postslist',function(err,collection){
			if(err){                                                                                                            
				mongodb.close();
				return callback(err);
			}

			collection.insert(post,{
				safe: true
			},function(err){
				mongodb.close();
				if(err){
					return callback(err);
				}
				callback(null);
			})
		})
	})
}

// Post.getAll = function(name,callback){
// 	mongodb.open(function(err,db){
// 		if(err){
// 			return callback(err);
// 		}

// 		db.collection('postslist',function(err,collection){
// 			if(err){
// 				mongodb.close();
// 				return callback(err);
// 			}
// 			var query = {};
// 			if(name){
// 				query.name = name;
// 			}

// 			collection.find(query).sort({
// 				time: -1
// 			}).toArray(function(err,docs){
// 				mongodb.close();
// 				if(err){
// 					return callback(err);
// 				}
// 				docs.forEach(function(doc){
// 					doc.post = markdown.toHTML(doc.post);
// 				})
// 				callback(null,docs);
// 			})
// 		})
// 	})
// }

Post.getTen = function(name,page,callback){
	mongodb.open(function(err,db){
		if(err){
			return callback(err);
		}

		db.collection('postslist',function(err,collection){
			if(err){
				mongodb.close();
				return callback(err);
			}

			var query = {};
			if(name){
				query.name = name;
			}

			collection.count(query,function(err,total){
				//根据query对象查询，并跳过钱(page-1)*10个结果，返回之后的10个结果
				collection.find(query,{
					skip: (page - 1)*10,
					limit: 10
				}).sort({
					time: -1
				}).toArray(function(err,docs){
					mongodb.close();
					if(err){
						return callback(err);
					}

					docs.forEach(function(doc){
						doc.post = markdown.toHTML(doc.post);
					});
					callback(null,docs,total);
				});
			});
		});
	});
}

Post.getOne = function(name,day,title,callback){
	mongodb.open(function(err,db){
		if(err){
			return callback(err);
		}

		db.collection('postslist',function(err,collection){
			if(err){
				mongodb.close();
				return callback(err);
			}
			collection.findOne({
				"name": name,
				"time.day": day,
				"title": title
			},function(err,doc){
				if(doc){
					collection.update({
						'name': name,
						'time.day': day,
						'title': title
					},{
						$inc:{"pv": 1}
					},function(err){
						mongodb.close();
						if(err){
							return callback(err);
						}
					});
					
					doc.post = markdown.toHTML(doc.post);
					doc.comments.forEach(function(comment){
						comment.content = markdown.toHTML(comment.content);
					});
				}
				callback(null,doc);
			})
		})
	})
}

Post.edit = function(name,day,title,callback){
	mongodb.open(function(err,db){
		if(err){
			return callback(err);
		}
		db.collection('postslist',function(err,collection){
			if(err){
				mongodb.close();
				return callback(err);
			}
			collection.findOne({
				"name": name,
				"time.day": day,
				"title": title
			},function(err,doc){
				mongodb.close();
				if(err){
					return callback(err);
				}
				callback(null,doc);
			})
		})

	})
}

Post.update = function(name,day,title,post,callback){
	mongodb.open(function(err,db){
		if(err){
			return callback(err);
		}

		db.collection('postslist',function(err,collection){
			if(err){
				mongodb.close();
				return callback(err);
			}
			collection.update({
				"name": name,
				"time.day": day,
				"title": title
			},{
				$set: {post: post}
			},function(err){
				mongodb.close();
				if(err){
					return callback(err);
				}
				callback(null);
			});
		});
	});
}

Post.remove = function(name,day,title,callback){
	mongodb.open(function(err,db){
		if(err){
			return callback(err);
		}
		db.collection('postslist',function(err,collection){
			if(err){
				mongodb.close();
				return callback(err);
			}
			collection.remove({
				"name": name,
				"time.day": day,
				"title": title
			},{
				w: 1
			},function(err){
				mongodb.close();
				if(err){
					return callback(err);
				}
				callback(null);
			});
		});
	});
}

Post.getArchive = function(callback){
	mongodb.open(function(err,db){
		if(err){
			return callback(err);
		}

		db.collection('postslist',function(err,collection){
			if(err){
				mongodb.close();
				return callback(err);
			}
			collection.find({},{
				"name": 1,
				"time": 1,
				"title": 1
			}).sort({
				time: -1
			}).toArray(function(err,docs){
				mongodb.close();
				if(err){
					return callback(err);
				}
				callback(null,docs);
			});
		});
	});
};

Post.getTags = function(callback){
	mongodb.open(function(err,db){
		if(err){
			return callback(err);
		}

		db.collection('postslist',function(err,collection){
			if(err){
				mongodb.close();
				return callback(err);
			}
			collection.distinct('tags',function(err,docs){
				mongodb.close();
				if(err){
					return callback(err);
				}
				callback(null,docs);
			});
		});
	});
}

Post.getTag = function(tag,callback){
	mongodb.open(function(err,db){
		if(err){
			return callback(err);
		}

		db.collection('postslist',function(err,collection){
			if(err){
				mongodb.close();
				return callback(err);
			}
			collection.find({
				"tags": tag
			},{
				'name': 1,
				'time': 1,
				'title': 1
			}).sort({
				time: -1
			}).toArray(function(err,docs){
				mongodb.close();
				if(err){
					return callback(err);
				}
				callback(null,docs);
			})
		})
	})
}

Post.search = function(keyword,callback){
	mongodb.open(function(err,db){
		if(err){
			callback(err);
		}
		db.collection('postslist',function(err,collection){
			if(err){
				mongodb.close();
				return callback(err);
			}
			var pattern = new RegExp(keyword,'i');
			collection.find({
				"title": pattern
			},{
				"name": 1,
				"time": 1,
				"title": 1
			}).sort({
				time: -1
			}).toArray(function(err,docs){
				mongodb.close();
				if(err){
					callback(err);
				}
				callback(null,docs);
			})
		})
	})
}

