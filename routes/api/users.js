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
	let users= await client.keys('*');
	res.json(users);
});

// show specific user
router.get('/:id', async (req, res) => {
	id = parseInt(req.params.id);
	let user= await client.hmget('User' + `${id}`, 'first_name', 'last_name', 'email');
	res.json(user);
});

// create a new user
router.post('/', (req, res) => {
	const { first_name, last_name, email } = req.body;

	if (!first_name || !last_name || !email) {
		return res.status(400).send('You have empty fields! Try again.');
	} 
		
	user= client.incr('id', (err, id) => {
		client.hset('User' + id,
			'first_name', `${first_name}`,
			'last_name', `${last_name}`,
			'email', `${email}`
		);
	});
	console.log(user);
	
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