const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/users', require('./routes/api/users'));
app.set('view engine', 'ejs');
app.get('/', (req, res) => {
	res.render('index');
});
app.listen(3000, () => console.log('App started!'));
