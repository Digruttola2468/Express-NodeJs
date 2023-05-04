const express = require("express");
const morgan = require("morgan");

const app = express();
const PORT = 3000;

app.get('/profile' , (req,res) => {
  res.send('Page profile');
});

//middlewares 
app.use(morgan());

//middlewares
app.use( (req,res,next) => {
  if (req.query.login === "digruttola") 
    return next();
  
    res.send('No Autorizado');
});

app.get('/dashboard' , (req,res) => {
  res.send('Dashboard')
} );


app.listen(PORT);
console.log(`Server on port ${PORT}`);
