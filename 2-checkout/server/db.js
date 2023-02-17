const mysql = require("mysql2");
const Promise = require("bluebird");
require("dotenv").config();

// Configure process.env variables in ../.env
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

const db = Promise.promisifyAll(connection, { multiArgs: true });

var responsesTableSchema = 'id INT NOT NULL AUTO_INCREMENT PRIMARY KEY';
responsesTableSchema += 'session_id VARCHAR(64) NULL DEFAULT NULL',


db.connectAsync()
  .then(() => console.log(`Connected to MySQL as id: ${db.threadId}`))
  .then(() =>
    // Expand this table definition as needed:
    db.queryAsync(
      `CREATE TABLE IF NOT EXISTS responses (
        id INTEGER AUTO_INCREMENT,
        sessionId VARCHAR(64) NULL DEFAULT NULL,
        name VARCHAR(30) NULL DEFAULT NULL,
        email VARCHAR(30) NULL DEFAULT NULL,
        password VARCHAR(20) NULL DEFAULT NULL,
        address1 VARCHAR(30) NULL DEFAULT NULL,
        address2 VARCHAR(30) NULL DEFAULT NULL,
        city VARCHAR(30) NULL DEFAULT NULL,
        state VARCHAR(30) NULL DEFAULT NULL,
        zipcode INTEGER NULL DEFAULT NULL,
        phone BIGINT NULL DEFAULT NULL,
        cardNum BIGINT NULL DEFAULT NULL,
        expire INTEGER NULL DEFAULT NULL,
        cvv INTEGER NULL DEFAULT NULL,
        billZip INTEGER NULL DEFAULT NULL,
        PRIMARY KEY (id)
      );`
    ))
  .catch((err) => console.log(err));

module.exports = db;
