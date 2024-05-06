const express = require("express");
const app = express();
const mongoose = require('mongoose');
const routers = require('./routers/routers');

app.use(express.json());

mongoose
    .connect("mongodb+srv://abhizgn1026:5nVJkTYWN6d0q3my@cluster0.wzp4ld5.mongodb.net/todo?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => { console.log("Successfully connected to database") })
    .catch(error => {
        console.log("[-] Mongoose error")
        console.log(error)
    })
    
    app.use('/api/todo', routers);
    
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`Listening to port ${port}`));

