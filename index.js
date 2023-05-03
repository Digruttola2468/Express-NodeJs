const express = require("express");
const app = express();
const PORT = 3000;

//Esta linea de codigo es para que express entienda los tipos de datos
//Es importante colocar esta linea de codigo antes de colocar los Routing
//Ya que express pasa por estas funciones para poder interpretarlos 

app.use(express.text()) //Entiende el tipo de dato TEXT que le enviamos en el request
app.use(express.json()) //Entiende los objetivos JSON que le enviamos en los request
app.use(express.urlencoded({extended: false})) //Para entender el codigo de un formulario (Form-Encode) HTML

app.post('/user', (req,res) => {
  console.log(req.body);
  res.send("Nuevo usuario creado")
});

app.listen(PORT);
console.log(`Server on port ${PORT}`);
