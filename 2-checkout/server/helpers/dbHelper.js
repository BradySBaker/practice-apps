const db = require("../db");

var getResponse = (session, cb) => {
	var query = `SELECT * FROM responses WHERE sessionId='${session}'`
	db.query(query, (err, data) => {
		if (err) {
			cb(err, null);
		} else {
			cb(null, data);
		}
	});
}

var saveResponse = (session, data, cb) => {
	getResponse(session, (err, data) => {
		console.log(data);
	});
	// var columns = 'sessionId';
	// var values = `'${session}'`
	// for (var key in data) {
	// 	columns += `, ${key}`
	// 	values += `, '${data[key]}'`;
	// }
	// console.log(columns, `values ${values}`);
	// var query = `INSERT INTO responses (${columns}) VALUES (${values})`
	// db.query(query, (err) => {
	// 	if (err) {
	// 		console.log(err);
	// 		cb(err);
	// 	} else {
	// 		cb(null);
	// 	}
	// });
};

module.exports.saveResponse = saveResponse;