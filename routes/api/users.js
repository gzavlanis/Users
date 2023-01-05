const express = require('express');
const router = express.Router();
const redis= require('redis');

// create connection to Redis
client= redis.createClient();

client.on("error", function (err) {
    console.log("Error: " + err);
});

client.on("connect", () => {
	console.log("Connected with Redis successfully.");
});

// show all users
router.get('/', (req, res) => {
	client.hgetall('User:');
});

// show specific user
router.get('/:id', (req, res) => {
	id = parseInt(req.params.id);
	res.json(client.hget('User' + `${id}`));
});

// create a new user
router.post('/', (req, res) => {
	const { first_name, last_name, email } = req.body;
	var id= 0;

	if (!first_name || !last_name || !email) {
		return res.status(400).send('You have empty fields! Try again.');
	}

	id++;
	client.hmset('User' + `${parseInt(id)}`, {
		'first_name': `${first_name}`,
		'last_name': `${last_name}`,
		'email': `${email}`
	});
	
});

// update a user
router.put('/:id', (req, res) => {
	id = parseInt(req.params.id);
	const { first_name, last_name, email } = req.body;

	if (!first_name || !last_name || !email) {
		return res.status(400).send('You have empty fields! Try again.');
	} else {
		client.hmset('User' + `${id}`, {
			'first_name': `${first_name}`,
			'last_name': `${last_name}`,
			'email': `${email}`
		});
	}
});

// delete user
router.delete('/:id', (req, res) => {
	id = parseInt(req.params.id);
	client.hdel('User' + `${id}`);
});

module.exports = router;