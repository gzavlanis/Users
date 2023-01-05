const express = require('express');
const router = express.Router();
const redis= require('redis');

// create connection to Redis
const client= redis.createClient({ legacyMode: true});
client.connect().then(async (res) => {
	console.log('Redis connected');
}).catch((err) => {
	console.log('There was an error: ' + err);
});

// show all users
router.get('/', (req, res) => {
	res.json(client.keys('*'));
});

// show specific user
router.get('/:id', (req, res) => {
	id = parseInt(req.params.id);
	res.json(client.hmGet('User' + `${id}`, 'first_name', 'last_name', 'email'));
});

// create a new user
var id;
router.post('/', (req, res) => {
	const { first_name, last_name, email } = req.body;

	if (!first_name || !last_name || !email) {
		return res.status(400).send('You have empty fields! Try again.');
	} else {
		client.hSet('User' + `${id.toString()}`, 
			'first_name', `${first_name}`,
			'last_name', `${last_name}`,
			'email', `${email}`
		);
		res.send('User created successfully!');
		id++;
	}
});

// update a user
router.put('/:id', (req, res) => {
	id = parseInt(req.params.id);
	const { first_name, last_name, email } = req.body;

	if (!first_name || !last_name || !email) {
		return res.status(400).send('You have empty fields! Try again.');
	} else {
		client.hSet('User' + `${id}`,
			'first_name', `${first_name}`,
			'last_name', `${last_name}`,
			'email', `${email}`
		);
		res.send('User updated successfully!');
	}
});

// delete user
router.delete('/:id', (req, res) => {
	id = parseInt(req.params.id);
	client.del('User' + `${id}`);
	res.send('User deleted.');
});

module.exports = router;