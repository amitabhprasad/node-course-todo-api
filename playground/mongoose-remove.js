const {ObjectID} = require('mongodb');
const {mongoose} = require('../server/db/mongoose');
const {Todo} = require('../server/models/todo');
const {User} = require('../server/models/user');


// Todo.remove({}).then((result)=>{
//     console.log(result);
// });

// Todo.findOneAndRemove({_id:'5bc8440cdc6292d6b6a2cd2d'}).then((result)=>{

// })

Todo.findByIdAndRemove('5bc8440cdc6292d6b6a2cd2d').then((todo)=>{
    console.log(todo);
})



