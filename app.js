require("dotenv").config("/.env");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const port = 5500;

const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static(__dirname + '/public'));
app.set('public', __dirname + "/public")

mongoose.connect("mongodb://127.0.0.1/todolistappejs", {useNewUrlParser: true}, console.log("Database succesfully connected!"));

const todoSchema = new mongoose.Schema ({
    title: String, 
    date: Date
});

const Todo = new mongoose.model("Todo", todoSchema);

app.get("/", function(req, res) {
    Todo.find({})
    .then(result => {
        console.log(result);
        res.render("todos", {todos: result});
    })
    .catch(err => {
        console.log(err);
    })
})  


app.get("/newtodo", function(req, res){
    res.render("createtodo")
})

app.post("/createnewtodo", function(req, res){
    const newTodo = new Todo({
        title: req.body.todoTitle, 
        date: req.body.todoDate
    })

    newTodo.save()
    .then(()=>{
        console.log("Todo succesfully created!");
        console.log(newTodo);
    })
    .catch(error => {
        console.log(error);
    })

    res.redirect("/");
})

app.listen(port, function(req, res){
    console.log(`Server is listening ${port} port!`);
})