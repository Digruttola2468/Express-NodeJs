const express = require('express')
const app = express();
const PORT = 3000;

//CRUD - Create , Read, Update, Delete

app.get('/products', (req, res) => {
    res.send('Lista de productos');
});

app.post('/products', (req, res) => {
    res.send('Creando productos');
});

app.put('/products', (req, res) => {
    res.send('Actualizando un producto');
});

app.delete('/products', (req, res) => {
    res.send('Eliminando producto');
});

app.patch('/products', (req, res) => {
    res.send('actualizando una parte del producto');
});



app.listen(PORT);
console.log(`Server on port ${PORT}`);