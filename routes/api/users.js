const express = require('express');
const router = express.Router();
const client= require('../../database');

// show all users
router.get('/', async (req, res) => {
	let users= await client.keys('User*');
	let data= [];
	for (let i = 0; i < users.length; i++) {
		let userData= await client.hgetall(users[i]);
		userData.id= parseInt(users[i].replace('User', ''));
		data.push(userData);
	}
	res.json(data);
});

// show specific user
router.get('/:id', async (req, res) => {
	id = parseInt(req.params.id);
	let user= await client.hgetall(`User${id}`);
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
	res.send('User deleted.');
});

module.exports = router;