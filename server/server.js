var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

app.use(bodyParser.json());

app.post('/todos',(req,res)=>{
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((results)=>{
        res.send(results);
    },(err)=>{
        res.status(400).send(err);
    })
});

app.get('/todos',(req,res)=>{
    Todo.find().then((todos)=>{
        res.send({
            todos:todos,
            status:'got data'
        });
    },(err)=>{
        res.status(400).send(err);
    });
})

app.listen(4501,()=>{
    console.log('Server started and listening at 4501');
})

module.exports = {app};


