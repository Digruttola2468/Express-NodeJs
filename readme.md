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

# Routing 

Routing en express es una manera de interpretar de usar las rutas de navegacion de nuestra aplicacion , donde colocando URL de la pagina /about , nos mostrara acerda de la aplicacion , si es una pagina para vender productos y queremos ver todos los productos , podemos usar el /product

Si la ruta no esta en nuestro sistema , podemos usar el `app.use()`

```JS
const express = require('express')
const app = express();
const PORT = 3000;

//ROUTING
app.get('/', (req,res) => { 
    //res.end('Hello World');    
    res.send('Hello World');
});

app.get('/about', (req,res) => { 
    //res.end('Hello World');    
    res.send('Acerca de este proyecto es ');
});

app.get('/weather', (req,res) => { 
    //res.end('Hello World');    
    res.send('The current weather is nice');
});

//SI la pagina no existe mostrar
app.use((req, res) => {
    res.status(404).send('No se encontro la pagina');
})

app.listen(PORT);
console.log(`Server on port ${PORT}`);
```

## HTTP Methods

