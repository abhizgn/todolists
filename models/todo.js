const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({         
    list: { type: String,
         required: true}
});

// create a model based on the schema
const todo = mongoose.model('todo', todoSchema);

module.exports = todo;


