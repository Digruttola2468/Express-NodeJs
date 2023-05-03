const express = require("express");
const app = express();
const PORT = 3000;

//
app.get('/hello/:username', (req,res) => {
  console.log(req.params);
  res.send(`Hello ${req.params.username}`);
});

app.get('/add/:x/:y', (req,res) => {
  const {x, y} = req.params
  res.send(`Suma: ${ parseInt(x) + parseInt(y) }`);
});

app.get('/nombre/:nombre/age/:age', (req,res) => {
  const {nombre, age} = req.params

  if(parseInt(age) >= 18 ) 
    return res.send(`Bienvenido ${nombre} , eres mayor de edad porque tenes ${age}`);
  
  res.send(`Bienvenido ${nombre} , NO eres mayor de edad porque tenes ${age} y ni llegas a los 18😡`);
});

app.listen(PORT);
console.log(`Server on port ${PORT}`);
