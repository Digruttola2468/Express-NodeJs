# Express Framework de NodeJs

Estamos desarrollando aplicaciones backend que seria del lado del servidor.
Usaremos el protocolo HTTP para comunicarse con el cliente y servidor

Request se comunica de cliente al servidor 
Response se comunica del servidor al cliente

## Porque usamos express para el servidor??
Usamos express para que el proyecto sea escalable y sea dinamico ya que con NodeJs queda un proyecto poco mantenible.

Por ejemplo en NodeJs tenemos que implenetar esta estructura de codigo para crear un servidor 

```JS
const http = require('http');
const fs = require('fs');
const PORT = 3000;

const server = http.createServer( (req, res) => {
    const read = fs.createReadStream('./static/index.html');
    read.pipe(res);
});

server.listen(PORT)

console.log(`Server on port ${PORT}`);
```

```JS
const express = require('express')
const app = express();
const PORT = 3000;

app.get('/', (req,res) => { 
    res.sendFile('./static/index.html', {
        root: __dirname
    });
});
app.listen(PORT);
console.log(`Server on port ${PORT}`);
```

Esta diferencia se va a notar cuando el proyecto del servidor vaya creciendo, y mostrara la gran diferencia entre realizar codigo con NodeJS y con el framework Express

