var express = require('express');
var bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

const port = process.env.PORT || 4501;

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
       // res.status(400).send(err);
    });
});

app.get('/todos/:id',(req,res)=>{
    var id = req.params.id;
    if(!ObjectID.isValid(id)){
        res.status(404).send();
     }
    Todo.findById(id).then((todo)=>{
        if(!todo){
            res.status(404).send(`Requested ID ${id} do not exist`);
        }
        res.send({
            todo:todo
        });
    }).catch((err)=>{
        res.status(400).send();
    });
});

app.delete('/todos/:id',(req,res)=>{
    var id = req.params.id;
    if(!ObjectID.isValid(id)){
          res.status(404).send();
     }

     Todo.findByIdAndRemove(id).then((result)=>{
         if(!result){
            res.status(404).send(`Requested ID ${id} do not exist`);
         }
         res.send({
            todo:result,
            result:'deleted'
        });
     }).catch((err)=>{
        console.log("ERROR ",err);
        res.status(400).send();
     });
});

app.listen(port,()=>{
    console.log(`Server started and listening at ${port}`);
})

module.exports = {app};


