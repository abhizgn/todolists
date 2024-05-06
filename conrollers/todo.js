const Todo = require('../models/todo');

const getAllTodos = async (req, res) => {
    try {
        let todos;

        if (req.query.id) {
            todos = await Todo.find({ id: parseInt(req.query.id) });
        } else if (req.query.list) {
            todos = await Todo.find({ list: req.query.list });
        } else {
            todos = await Todo.find();
        }

        res.status(200).json({ todos });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createTodo = async (req, res) => {
    const todo = new Todo({
        list: req.body.list
    });

    try {
        const newTodo = await todo.save();
        res.status(201).json(newTodo);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteTodo = async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        await todo.remove();
        res.json({ message: 'Deleted todo' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getTodoById = async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.status(200).json(todo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateTodo = async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        if (req.body.list != null) {
            todo.list = req.body.list;
        }
        const updatedTodo = await todo.save();
        res.json(updatedTodo);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    getAllTodos,
    createTodo,
    deleteTodo,
    getTodoById,
    updateTodo
};
