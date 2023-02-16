const db = require("../db");

var saveResponse = (session, data, cb) => {
	var values = `'${session}', '${data.name}', '${data.email}', '${data.password}'`
	var query = `INSERT INTO responses (sessionId, name, email, password) VALUES (${values})`
	db.query(query, (err) => {
		if (err) {
			console.log(err);
			cb(err);
		}
	})
}

module.exports.saveResponse = saveResponse;