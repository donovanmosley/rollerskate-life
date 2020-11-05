// console.log('Hello World');

const express = require("express");

const app = express();

app.get("/", function(req, res){
    res.send('Hello World');
});

app.listen(3000, function(){
    console.log('Server started up on port 3000');
});

// const express = require('express')
// const app = express();
// const port = 8000;

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// });

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}!`)