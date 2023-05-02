const express = require("express");
const app = express();
const PORT = 3000;

//Obtenemos un Texto
app.get("/", (req, res) => {
  res.send("Hello world");
});

//Obtenemos un archivo
app.get("/myarchivo", (req, res) => {
  res.sendFile("./java.png", {
    root: __dirname,
  });
});

//Obtener un dato de manera con un Objeto JSON
app.get("/user", (req, res) => {
  res.json({
    name: "fazt",
    lastName: "Digruttola",
    age: 40,
    points: [3, 4, 21],
  });
});

//isAlive se usa generalmenta para saber si el servidor esta funcionando
app.get('/isAlive', (req,res) => {
    //204 -> no muestra ningun contenido para mostrar que se obtuvo con exito
    res.sendStatus(204);
})

app.listen(PORT);
console.log(`Server on port ${PORT}`);
