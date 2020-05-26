const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db.js");

const rng = require("random-number");

// Middleware //
app.use(cors()); // Essential anytime you're using middleware
app.use(express.json()); // This gives us access to json in the request.body from data from the client-side

// ROUTES //

// Create a todo
app.post("/todos", async (req, res) => {
  // await - waits for the function to coplete before it continues
  try {
    // console.log(req.body);
    const { description } = req.body; // wait for the query to finish
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING *", // Then insert our variable ($1 = [])
      [description] // passing our variable into the sql command
    );

    // RETURNING * is used whenever you're returning or updating the data, you'll see the information of the data passed into the table
    res.json(newTodo.rows[0]); // res.json(newTodo.rows[0]) is also acceptable
  } catch (err) {
    console.error(err.message);
  }
});

// get all todos

app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo");
    console.log("Getting all the dodos");
    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// get a todo
app.get("/todos/:id", async (req, res) => {
  try {
    // console.log(req.params); // You can find the :params in the route in the request params object
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.json(todo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// update a todo
app.put("/todos/:id", async (req, res) => {
  try {
    // Grab the specific id from the route in a query
    const { id } = req.params;
    const { description } = req.body;

    const updateTodo = await pool.query(
      "UPDATE todo SET description = $1 WHERE todo_id = $2",
      [description, id]
    );
    console.log("this should be showing in nodemon");
    res.json("Updated todo");
  } catch (err) {
    console.error(err.message);
  }
});

// delete a todo
app.delete("/todos/:id", async (req, res) => {
  console.log("starting the delete route function");
  try {
    const { id } = req.params;
    console.log("This is the id", id);
    const selectedTodo = await pool.query("");
    const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.json("Todo was deletarino'd");
  } catch (err) {
    console.log(err.message);
  }
});

//* Random server introduction *//
let introduction = [
  "Hello postgres",
  "Henlo forest boy",
  "Greetings Randy butternubs",
  "Hello Nature",
  "Yee haw",
  "Ready to do some debugging",
  "Work your butt off for this jazz",
  "Don't give up, augment the wheel",
  "Carry on, spagooter cruiser",
  "Stay strong, and secure the server",
  "I don't know what else to say, work hard dude",
];
let num = rng({
  min: 0,
  max: 9,
  integer: true,
});
app.listen(5000, () => {
  console.log(`Server has started on port 5000! ${introduction[num]}`);
});
// in command line in server directory: "node index" will start the server!
// Nodemon is an autoreloading version of the node servers! Type in "nodemon index" for the live autoreloading version of the server
