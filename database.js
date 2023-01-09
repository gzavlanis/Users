const redis= require('ioredis');

// create connection to Redis
const client= redis.createClient();
// client.connect().then(async (res) => {
// 	console.log('Redis connected');
// }).catch((err) => {
// 	console.log('There was an error: ' + err);
// });

module.exports= client;