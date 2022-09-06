const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');
const path = require("path");
const PORT = process.env.PORT || 5000;

//process.env.PORT
//process.env.NODE_ENV => production or undefined


// middleware
app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === "production") {
    //server static content
    //npm run build
    app.use(express.static(path.join(__dirname, "todoclient/build")));
}

// ROUTES //

//create a todo

app.post('/todos', async(req,res) => {
    try {
        const {description} = req.body;
        const newTodo = await pool.query(
            "INSERT INTO todo (description) VALUES($1) RETURNING *", 
            [description]
        );

        res.json(newTodo.rows[0]);
    } catch (error) {
        console.error(error.message);
    }
})

//get all todos

app.get("/todos", async(req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo");
        res.json(allTodos.rows);
    } catch (error) {
        console.error(error.message);
    };
});

//get a todo

app.get("/todos/:id", async(req,res) => {
    try {
        const {id} = req.params;
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id]);

        res.json(todo.rows[0]);
    } catch (error) {
        console.error(error.message);
    }
});

//update a todo

app.put("/todos/:id", async(req, res) => {
    try {
       const {id} = req.params;
       const {description} = req.body;
       const updateTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2",
       [description, id]
       );

       res.json("Todo was updated");
    } catch (error) {
        console.error(error.message);
    };
});

//delete a todo

app.delete("/todos/:id", async(req, res) => {
    try {
       const {id} = req.params;
       const deletTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);

       res.json("Todo was deleted")
    } catch (error) {
        console.error(error.message);
    }
})

// ROUTES end //

app.listen(PORT, () => {
    console.log(`server has started on port ${PORT}`);
});