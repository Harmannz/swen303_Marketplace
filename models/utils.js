var dbClient = require('./db')
   ,_=require('lodash')

/*Get the category tree*/
exports.getCategories = function(cb, errorCb){
	var query = dbClient.query("select c.cid, c.name as child, p.name as parent from categories c inner join categories p on c.parentcid = p.cid",[]);

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
		var cleaned = _.mapValues(grouped,function(o){
			return _.map(o,function(oc){
				return {
                    id: oc.cid,
                    name: oc.child
                };
			})
		})
		delete cleaned['See All - Consumer Electronics'];
		return cleaned;
	}
}
//constructs a querystring and args for sql query from obj
exports.shallowObjToQuery = function(o){
	var queryObj = {
		string: "",
		args: []
	}

	var keysLen = _.keys(o).length;
	var qString;
	_.forEach(o,function(val,key){
		if(qString == undefined){
			qString = key.toString();
		}else{
			qString += ", " + key;
		}
		queryObj.args.push(val);
	})
	var dollarString = "";
	for(var i = 0; i < keysLen; i++){
		dollarString += (i == 0)? ("$" + (i+1)) : (", $" + (i+1));
	}
	qString = "(" + qString + ") values (" + dollarString + ")";
	queryObj.string = qString;
	return queryObj;
}
