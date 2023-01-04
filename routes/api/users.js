const express = require('express');
const router = express.Router();
const connection = require('../../database');

// show all users
router.get('/', (req, res) => {
	connection.query('SELECT * FROM Users ORDER BY id', (err, result, fields) => {
		if (err) throw err;
		if (result.length) {
			res.send(result);
		} else {
			res.send('There are no users here yet.');
		}
	});
});

// show specific user
router.get('/:id', (req, res) => {
	id = parseInt(req.params.id);
	connection.query(`SELECT * FROM Users WHERE id= "${id}"`, (err, result, fields) => {
		if (err) throw err;
		if (result.length) {
			res.send(result);
		} else {
			res.send('User not found.');
		}
	});
});

// create a new user
router.post('/', (req, res) => {
	const { first_name, last_name, email } = req.body;

	if (!first_name || !last_name || !email) {
		return res.status(400).send('You have empty fields! Try again.');
	}

	const sql = `INSERT INTO Users (first_name, last_name, email) VALUES ('${first_name}', '${last_name}', '${email}')`;
	connection.query(sql, (err, result, field) => {
		if (err) throw err;
		res.send('User created.');
	});
});

// update a user
router.put('/:id', (req, res) => {
	id = parseInt(req.params.id);
	const { first_name, last_name, email } = req.body;

	if (!first_name || !last_name || !email) {
		return res.status(400).send('You have empty fields! Try again.');
	}

	const sql = `UPDATE Users SET first_name= '${first_name}', last_name= '${last_name}', email= '${email}' WHERE id= '${id}'`;
	connection.query(sql, (err, result, field) => {
		if (err) throw err;
		res.send('User Updated.');
	});
});

// delete user
router.delete('/:id', (req, res) => {
	id = parseInt(req.params.id);
	const sql = `DELETE FROM Users WHERE id= '${id}'`;
	connection.query(sql, (err, result, field) => {
		if (err) throw err;
		res.send('User deleted successfully.');
	});
});

module.exports = router;
