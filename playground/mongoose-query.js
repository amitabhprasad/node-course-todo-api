const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

var id ='5bc35943376a65a078ebab63-111';
var userId = '5bba213dc86caf8fd1de7b4e';
if(!ObjectID.isValid(id)){
   // return console.log('Invalid ID')
}

// Todo.find({
//     _id:id
// }).then((todos)=>{
//     console.log('Todo find',todos);
// });

// Todo.findOne({
//     _id:id
// }).then((todo)=>{
//     console.log('Todo findOne',todo);
// });

Todo.findById(id).then((todo)=>{
    if(!todo){
        return console.log(`Given id ${id} not found`);
    }
    console.log('Todo find by id',todo);
}).catch((err)=>{
    console.log('Error during findByID on Todo',err);
});

console.log('---------FindByID on User--------');

User.findById(userId).then((user)=>{
    if(!user){
        return console.log(`Given user id ${userId} not found`);
    }
    console.log('User find by id',user);
}).catch((err)=>{
    console.log('Error during findByID on User');
})

