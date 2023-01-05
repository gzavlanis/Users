const express = require('express');
const redis= require('redis');
const router = express.Router();

// show all users
router.get('/', (req, res) => {
	res.json(redis.hgetall('User'));
});

// show specific user
router.get('/:id', (req, res) => {
	id = parseInt(req.params.id);
	res.json(redis.hget('User' + `${id}`));
});

// create a new user
router.post('/', (req, res) => {
	const { first_name, last_name, email } = req.body;
	var id= 0;

	if (!first_name || !last_name || !email) {
		return res.status(400).send('You have empty fields! Try again.');
	} else {
		id++;
		redis.hmset('User' + `${parseInt(id)}`, {
			'first_name': `${first_name}`,
			'last_name': `${last_name}`,
			'email': `${email}`
		});
	}
});

// update a user
router.put('/:id', (req, res) => {
	id = parseInt(req.params.id);
	const { first_name, last_name, email } = req.body;

	if (!first_name || !last_name || !email) {
		return res.status(400).send('You have empty fields! Try again.');
	} else {
		redis.hmset('User' + `${id}`, {
			'first_name': `${first_name}`,
			'last_name': `${last_name}`,
			'email': `${email}`
		});
	}
});

// delete user
router.delete('/:id', (req, res) => {
	id = parseInt(req.params.id);
	redis.hdel('User' + `${id}`);
});

module.exports = router;