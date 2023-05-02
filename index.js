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