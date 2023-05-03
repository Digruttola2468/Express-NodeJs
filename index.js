const express = require("express");
const app = express();
const PORT = 3000;


app.get('/search', (req,res) => {
  if (req.query.q === 'java') {
    return res.send('Lista de libros de java')
  }

  res.send('Pagina normal');
});
//Cuando el query se repite , express crea un objeto del nombre correspondiente y los datos en un array
//Un ejemplo de esto es que si ponemos /search?user=ivan&user=digruttola
//Express nos devuelve un objetivo JSON con los siguientes datos
/*
{user: ['ivan','digruttola']}
*/

app.listen(PORT);
console.log(`Server on port ${PORT}`);
