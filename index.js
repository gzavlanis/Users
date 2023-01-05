const express = require('express');
const app = express();
const redis= require('redis');



app.use(express.json());
app.use(express.urlencoded({
	extended: true
}));

app.get("/", (req, res) => {
	res.status(200);
});

app.listen(3000, () => {
	console.log("API started.");
});