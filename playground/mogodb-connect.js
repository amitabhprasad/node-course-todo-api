//const MongoClient = require('mongodb').MongoClient;

const {MongoClient,ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
    if(err){
        return console.log("Unable to connect to MongoDB Server ",err);
    }
    console.log('Connected to MongoDB');
    // db.collection('Todos').insertOne({
    //     test: 'Something to do',
    //     completed: false
    // },(err, result)=>{
    //     if(err){
    //         return console.log('Unable to insert into Todos',err);
    //     }
    //     console.log(JSON.stringify(result.ops,undefined,2));
    // });

    // db.collection('Users').insertOne({
    //     name: 'Amitabh',
    //     age: 37,
    //     location: 'India'
    // },(err,result)=>{
    //     if(err){
    //         return console.log('Inable to insert into table Users',err);
    //     }
    //     console.log(JSON.stringify(result.ops,undefined,2));

    //     console.log(JSON.stringify(result.ops[0]._id.getTimestamp()));
    // });
    db.close();
});