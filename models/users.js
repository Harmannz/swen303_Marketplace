var dbClient = require('./db')
   ,Utils = require('../models/utils')
   , _ = require('lodash')
   ,bcrypt = require('bcrypt');

const saltRounds = 10;

exports.addUser = function(data,cb,errorCb){
    data.password = bcrypt.hashSync(data.password, saltRounds);
	var queryParams = Utils.shallowObjToQuery(data);
	var query = dbClient.query("insert into users " + queryParams.string +" returning *" , queryParams.args);

	query.on('error',function(e){
		errorCb(e);
	})

	query.on('end',function(summary){
		cb(summary);
	})
}
/*Gets the last user (should only be one) who has the email or username specified */
exports.fromUsername = function(id,cb,errorCb){

	var query = dbClient.query("select * from users where username = $1",[id]);
	var data;

	query.on('row',function(d){
		data = d;
	});

	query.on('error',function(er){
		errorCb(er);
	});

	query.on('end',function(e){
		cb(data);
	})
}

exports.checkForNotifications = function(userId, cb, errorCb) {
    var query = dbClient.query("SELECT d.name FROM (SELECT a.product_id FROM productinorder AS a INNER JOIN orders AS b ON a.order_id=b.order_id WHERE b.user_id=$1 AND a.rent_due_date < (NOW() + interval '1 days')) as c"
            + " INNER JOIN products AS d ON c.product_id=d.pid",
        [userId], function(err, results) {
            if (err) {
                errorCb(err);
            } else {
                var notifications = [];

                results.rows.forEach(function(row) {
                    notifications.push({
                        notification_type: 'due < 1 day',
                        product: row.name
                    });
                });

                cb(notifications);
            }
        });
};
