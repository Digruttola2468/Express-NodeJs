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

## Request Body

```JS
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
```

## Request Params

```JS
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
```

## Queries

Los queries son los que le da informacion adicionar al servidor para realizar operaciones, se usa generalemente para navegar en la pagina

Un ejemplo para colocar queries seria la siguiente `http://localhost:3000/producto?page=20&category=ropa` , el queri comienda despues del **?** colocando luego las variables del mismo, `page=20` depende como esta diseñado podemos obtener 20 productos de un E-Commerse, con el **&** nos permite agregar otra variable , en este caso `category=ropa` donde nos obtendra 20 productos de la categoria ropa 

```JS
app.get('/search', (req,res) => {
  if (req.query.q === 'java') {
    return res.send('Lista de libros de java')
  }

  res.send('Pagina normal');
});
```

Cuando el query se repite , express crea un objeto del nombre correspondiente y los datos en una array.

Un ejemplo de esto es que si ponemos `/search?user=ivan&user=digruttola` Express nos devuelve un objetivo JSON con los siguientes datos: `{user: ['ivan','digruttola']}`

## Middlewares

El **middlewares** es una parte del codigo donde se ejecuta primero un bloque de codigo y luego nos dirije a la ruta `/about` por ejemplo.

Se usa mucho para verificar la identidad de la persona antes de cargar la ruta especificada , ya sea que si queremos ir a la ruta `/dashboard` donde tenemos datos exclusivos para pocas personas autenticadas , con el middlewares nos ayuda a procesar la peticion y verificar si la persona esta authenticada.

Cada middlewares tiene su propia funcion

```JS
//middlewares 
app.use( (req, res,next) => {
  console.log(`Route: ${req.url} `, `Metodo: ${req.method}`);
  next();
});

//middlewares
app.use( (req,res,next) => {
  if (req.query.login === "digruttola") 
    return next();
  
    res.send('No Autorizado');
});

app.get('/dashboard' , (req,res) => {
  res.send('Dashboard')
} );

app.get('/profile' , (req,res) => {
  res.send('Page profile');
});
```

El problema de este codigo es que si queremos visitar la pagina `/profile` tenemos que enviarle la authenticacion , pero si la pagina no necesita authenticacion , como podemos visitar la pagina sin realizar el query de authenticacion?? 

Bueno la soluncion esta en el orden que coloquemos las funciones , en todo caso la funcion `app.get('/profile', (req,res) => {})` estaria arriba de los middlewares

```JS

app.get('/profile' , (req,res) => {
  res.send('Page profile');
});

//middlewares 
app.use( (req, res,next) => {
  console.log(`Route: ${req.url} `, `Metodo: ${req.method}`);
  next();
});

//middlewares
app.use( (req,res,next) => {
  if (req.query.login === "digruttola") 
    return next();
  
    res.send('No Autorizado');
});

app.get('/dashboard' , (req,res) => {
  res.send('Dashboard')
} );
```

## Middleware interceptor

Existen muchos tipos de middleware , ya sea para authenicar , interpretar formatos JSON o Textos , para mostrar informacion sobre la peticion , etc.

Estos middleware lo podemos instalar en nuestro proyecto para facilitar la tarea. Son basicamente librerias que nos provee codigo ya realizado por otro programador.

Un ejemplo de una libreria de middleware es [Morgan](https://npmjs.com/package/morgan) para instalarlo hay que colocar en consola del sistema `npm i morgan`

```JS
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
```

Donde esta funcion `app.use(morgan())` nos devuelve lo siguiente 

```
::1 - - [Thu, 04 May 2023 22:06:29 GMT] "GET /favicon.ico HTTP/1.1" 304 - "http://localhost:3000/dashboard?login=iva" "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36"
```

## REST API

Es un servidor que posee URL para procesar datos.

Donde el **API (Application programing interface)** es la comunicacion entre el cliente y el servidor , donde el servidor se encarga de obtener los datos de una base de datos y se lo muestra al cliente.

Por otro lado **REST** viene de la parte de las peticiones que les podemos hacer al servidor ya sea `GET /products` `GET /products/:id` `POST /products/:id` `DELETE /products/:id`.



