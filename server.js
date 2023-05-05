const express = require('express')
const morgan = require('morgan')

const app = express();
const PORT = 3000;

//Settings
//Sirve para tener todo en un solo lugar la configuracion de la aplicacion
app.set('appName', 'Express Course')
app.set('Port', 3000);

console.log(app.get('appName'));
console.log(app.get('Port'));

const products = [ 
    {
        id: 1,
        name: "Laptop",
        price: 2000
    } 
];

app.use(morgan('dev'))
app.use(express.json())

//app.use(express.static('./public'))

app.get('/saludo', (req,res) => {
    res.send('Saludar')
})

//Este middleware se coloca al final del codigo , ya que si no existe una ruta /public , se abre esta
app.use('/public',express.static('./public'))

app.get('/products' , (req,res) => {
    res.json(products);
})

app.post('/products' , (req,res) => {
    products.push({...req.body, id: products.length + 1});
    res.send("Creando productos");
})

app.put('/products/:id' , (req,res) => {
    const newData = req.body;

    const productoFind = products.find((product) => parseInt(req.params.id) === product.id)
    if(!productoFind) return res.status(404).json({message: "Not Found product"})
    
    products = products.map( p => p.id === parseInt(req.params.id) ? {...p, ...newData} : p);

    res.json({message: "Product updated success"})
})

app.delete('/products/:id' , (req,res) => {
    const productoFind = products.find((product) => parseInt(req.params.id) === product.id)
    if(!productoFind) return res.status(404).json({message: "Not Found product"})

    products = products.filter( p => p.id !== parseInt(req.params.id) );

    res.status(200).send(products)
})

app.get('/products/:id' , (req,res) => {
    console.log(req.params.id);
    const producto = products.find((product) => parseInt(req.params.id) === product.id)
    
    if(!producto) return res.status(404).json({message: "Not Found product"})

    res.json(producto);
})

app.listen(PORT);
console.log(`Server on PORT: ${PORT}`);
