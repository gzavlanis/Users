const express = require('express');
const router = express.Router();
const redis= require('ioredis');

// create connection to Redis
const client= redis.createClient();
client.connect().then(async (res) => {
	console.log('Redis connected');
}).catch((err) => {
	console.log('There was an error: ' + err);
});

// show all users
router.get('/', async (req, res) => {
	let users= [await client.keys('*')];
	let data= [];
	for (var i = 1; i < users.length; i++) {
		data[i]= client.hgetall('User' + `${i}`)
	}
	res.json(data);
});

// show specific user
router.get('/:id', async (req, res) => {
	id = parseInt(req.params.id);
	let user= await client.hgetall('User' + `${id}`);
	res.json(user);
});

// create a new user
router.post('/', async (req, res) => {
	const { first_name, last_name, email } = req.body;

	if (!first_name || !last_name || !email) {
		return res.status(400).send('You have empty fields! Try again.');
	} else {
		await client.incr('id', (err, id) => {
			client.hmset('User' + id,
				'first_name', `${first_name}`,
				'last_name', `${last_name}`,
				'email', `${email}`
			);
		});
		res.send('User created successfully');
	}
});

// update a user
router.put('/:id', async (req, res) => {
	id = parseInt(req.params.id);
	const { first_name, last_name, email } = req.body;

	if (!first_name || !last_name || !email) {
		return res.status(400).send('You have empty fields! Try again.');
	} else {
		await client.hset('User' + `${id}`,
			'first_name', `${first_name}`,
			'last_name', `${last_name}`,
			'email', `${email}`
		);
		res.send('User updated successfully!');
	}
});

// delete user
router.delete('/:id', async (req, res) => {
	id = parseInt(req.params.id);
	await client.del('User' + `${id}`);
	es.send('User deleted.');
});

module.exports = router;