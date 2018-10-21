require('./config/config');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const _ = require('lodash');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate')

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
         return res.status(404).send();
     }

     Todo.findByIdAndRemove(id).then((result)=>{
         if(!result){
           return  res.status(404).send(`Requested ID ${id} do not exist`);
         }
         res.send({
            todo:result,
            result:'deleted'
        });
     }).catch((err)=>{
        return res.status(400).send();
     });
});


app.patch('/todos/:id',(req,res)=>{
    var id = req.params.id;
    var body = _.pick(req.body,['text','completed']);

    if(!ObjectID.isValid(id)){
        return res.status(404).send();
   }

   if(_.isBoolean(body.completed) && body.completed){
      body.completedAt= new Date().getTime();
   }else {
    body.completed = false;
    body.completedAt = null;
   }

   Todo.findByIdAndUpdate(id,{$set: body},{new:true}).then((todo)=>{
        if(!todo){
            return res.status(404).send();
        }
        res.send({todo:todo})
   }).catch((err)=>{
        res.send(400);
   });
});


app.post('/users',(req,res)=>{

    var body = _.pick(req.body,['email','password']);

    var user = new User(body);

    user.save().then(()=>{
       return user.generateAuthToken();
    }).then((token)=>{
        res.header('x-auth',token).send(user)
    }).catch((err)=>{
        console.log(err);
        return res.status(400).send(err);
    });
});



app.get('/users/me',authenticate,(req,res)=>{
    res.send(req.user);
});

app.listen(port,()=>{
    console.log(`Server started and listening at ${port}`);
})

module.exports = {app};


