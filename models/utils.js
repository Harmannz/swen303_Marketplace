var dbClient = require('./db')
   ,_=require('lodash')

/*Get the category tree*/
exports.getCategories = function(cb, errorCb){
	var query = dbClient.query("select c.name as child, p.name as parent from categories c inner join categories p on c.parentcid = p.cid",[]);
	
	var data = [];
	query.on('row',function(d){
		data.push(d);
	});

	query.on('error',function(er){
		errorCb(er);
	});

	query.on('end',function(e){
		cb(formatTree(data));
	});

	function formatTree(d){
		grouped = _.groupBy(d,'parent');
		console.log(grouped);
		var cleaned = _.mapValues(grouped,function(o){
			return _.map(o,function(oc){
				return oc.child;
			})
		})
		return cleaned;
	}
}