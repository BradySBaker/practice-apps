const db = require("../db");

var retrieveResponse = (session, cb) => {
	var query = `SELECT * FROM responses WHERE sessionId='${session}'`
	db.query(query, (err, data) => {
		if (err) {
			cb(err, null);
		} else {
			cb(null, data);
		}
	});
}

var createInsertQuery = (data, sessionId) => {
	var columns = 'sessionId';
	var values = `'${sessionId}'`;
	for (var key in data) {
			columns += `, ${key}`
			values += `, '${data[key]}'`;
		}
	var query = `INSERT INTO responses (${columns}) VALUES (${values})`
	return query;
}

var createUpdateQuery = (data, sessionId) => {
	var setQuery;
	for (var key in data) {
		if (!setQuery) {
			setQuery = `${key} = '${data[key]}'`
		} else {
			setQuery += `, ${key} = '${data[key]}'`
		}
	}
	var query = `UPDATE responses SET ${setQuery} WHERE sessionId = '${sessionId}'`
	return query;
}

var saveResponse = (session, data, cb) => {
	retrieveResponse(session, (err, responseData) => {
		if (err) {
			cb(err);
			return;
		}
		var columns;
		var values;
		var query;
		if (responseData.length === 0) {
			if (data.name) {
				value = `'${session}'`
				query = createInsertQuery(data, session);
			} else {
				cb('Missing form');
				return;
			}
		} else {
			if (data.name) {
				if (responseData.length === 14) {
					cb('You already submitted this form!');
					return;
				}
				cb(null);
			}
			query = createUpdateQuery(data, session);
		}

		db.query(query, (err) => {
			if (err) {
				console.log(err);
				cb(err);
			} else {
				cb(null);
			}
		});
	});
};

module.exports.saveResponse = saveResponse;
module.exports.retrieveResponse = retrieveResponse;