# Express Framework de NodeJs

Estamos desarrollando aplicaciones backend que seria del lado del servidor.
Usaremos el protocolo HTTP para que se comunique el cliente y servidor

- Request se comunica de cliente al servidor 
- Response se comunica del servidor al cliente

## Porque usamos express para el servidor??

Usamos **express** para que el proyecto sea **escalable** ya que con NodeJs queda un proyecto poco mantenible.

Por ejemplo en NodeJs tenemos que implementar esta estructura de codigo para crear un servidor 

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

Pero con Express usaremos el siguiente codigo donde vemos que no usaremos fs para leer archivos , lo reemplazamos por `res.sendFile();`

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

Esta diferencia se va a notar mas cuando el proyecto del servidor vaya creciendo, mostrando una gran diferencia entre realizar codigo con NodeJS y con el framework Express

# Routing 

Routing en express es una manera de interpretar las rutas de navegacion de nuestra aplicacion , donde colocando URL (donde la URL en este caso es http://localhost:3000 ) + /about , nos mostrara acerda de la aplicacion , si es una pagina para vender productos y queremos ver todos los productos , podemos usar el /product y queria de la siguiente manera http://localhost:3000/product

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

Esto esta relacionado con HTTP , de los metodos de comunicacion entre el cliente y servidor por parte del Request y Response

GET -> Retorna un dato del servidor 
POST -> Guarda el dato en el servidor
PUT -> Cliente esta tratando de actualizar todo los datos ya existente en el servidor
PATCH -> Actualizar un dato
DELETE -> Cliente esta eliminando un dato

## HTTP Express

Para este ejemplo usaremos una extencion de Visual studio code , llamado `Thunder client` donde nos permite usar los metodos HTTP de nuestra aplicacion

```JS
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
```

## HTTP Response

```JS
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
```