const mysql = require('mysql');

// create a connection
var connection = mysql.createConnection({
	multipleStatements: true,
	host: 'localhost',
	user: 'george',
	password: 'gz861994'
});
connection.connect(function (err) {
	if (err) throw err;
	console.log('Connection was successful!');

	// create database
	connection.query('CREATE DATABASE if not exists myData;', function (err) {
		if (err) throw err;
		console.log('Database created.');
	});

	// create a table
	var sql1 = 'USE myData;';
	var sql2 = 'CREATE TABLE if not exists Users (id INT AUTO_INCREMENT PRIMARY KEY, first_name VARCHAR(50) NOT NULL, last_name VARCHAR(50) NOT NULL, email VARCHAR(50))';
	connection.query(sql1, function (err) {
		if (err) throw err;
	});
	connection.query(sql2, function (err) {
		if (err) throw err;
		console.log('Table created.');
	});
});

module.exports = connection;
