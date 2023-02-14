require("dotenv").config();
var express = require('express');
var app = express();
var db = require('./db');
app.use('/client', express.static('./client/dist'));

app.use(express.json());

app.post('/words', (req, res) => {
	db.addWord(req.body, (err) => {
		if (err) {
			res.statusCode = 404;
			res.end();
		} else {
			res.statusCode = 201;
			res.send(JSON.stringify(req.body));
		}
	});
});

app.get('/words', (req, res) => {
	db.getWords((err, data) => {
		if (err) {
			res.statusCode = 404;
			res.end();
		} else {
			res.statusCode = 200;
			res.send(JSON.stringify(data));
		}
	});
});

app.delete('/words', (req, res) => {
	db.deleteWord(req.body.term, (err) => {
		if (err) {
			res.statusCode = 404;
			res.end();
		} else {
			res.statusCode = 202;
			res.send(JSON.stringify(req.body));
		}
	});
});

app.listen(process.env.PORT, () => {
	console.log('listening on ' + process.env.PORT);
});
