const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');

// middleware
app.use(cors());
app.use(express.json());

// ROUTES //

//create a todo

app.post('/todos', async(req,res) => {
    try {
        const {description} = req.body;
        const newToDo = await pool.query(
            "INSERT INTO todo (description) VALUES($1) RETURNING *", 
            [description]
        );

        res.json(newToDo.rows[0]);
    } catch (error) {
        console.error(error.message);
    }
})

//get all todos

app.get("/todos", async(req, res) => {
    try {
        const allToDos = await pool.query("SELECT * FROM todo");
        res.json(allToDos.rows);
    } catch (error) {
        console.error(error.message);
    };
});

//get a todo

//update a todo

//delete a todo

app.listen(5000, () => {
    console.log('server has started on port 5000');
});