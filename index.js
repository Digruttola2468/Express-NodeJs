const express = require('express')
const app = express();
const PORT = 3000;

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

app.use((req, res) => {
    res.send('No se encontro la pagina');
})

app.listen(PORT);
console.log(`Server on port ${PORT}`);