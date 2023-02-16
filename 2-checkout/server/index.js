require("dotenv").config();
const express = require("express");
const path = require("path");
const sessionHandler = require("./middleware/session-handler");
const logger = require("./middleware/logger");

// Establishes connection to the database on server start
const db = require("./db");
const dbHelper = require("./helpers/dbHelper");

const app = express();

// Adds `req.session_id` based on the incoming cookie value.
// Generates a new session if one does not exist.
app.use(sessionHandler);

// Logs the time, session_id, method, and url of incoming requests.
app.use(logger);
app.use(express.json());
// Serves up all static and generated assets in ../client/dist.
app.use(express.static(path.join(__dirname, "../client/dist")));

app.post('/response', (req, res) => {
	dbHelper.saveResponse(req.session_id, req.body, (err) => {
		if (err) {
			res.statusCode = 404;
			res.send(JSON.stringify(err));
		} else {
			res.statusCode = 201;
			res.send(JSON.stringify(req.body));
		}
	});
});
app.listen(process.env.PORT);
console.log(`Listening at http://localhost:${process.env.PORT}`);
