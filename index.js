const express = require("express");
const morgan = require("morgan");

const HomeRoute = require('./routes/home');
const UserRoute = require('./routes/users');

const app = express();
const PORT = 3000;

//middlewares 
app.use(morgan('dev'));
app.use(express.json());

app.use(HomeRoute);
app.use(UserRoute);

app.listen(PORT);
console.log(`Server on port ${PORT}`);
