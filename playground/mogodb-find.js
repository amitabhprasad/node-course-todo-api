//const MongoClient = require('mongodb').MongoClient;

const {MongoClient,ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
    if(err){
        return console.log("Unable to connect to MongoDB Server ",err);
    }
    console.log('Connected to MongoDB');
    // db.collection('Todos').find({
    //     //completed:false
    //     _id: new ObjectID('5bb9e5a891c475fffdc9fb1e')
    // }).toArray().then((docs)=>{
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs,undefined,2));
    // },(err)=>{
    //     console.log('Unable to fetch Todos', err);
    // });

    // db.collection('Todos').find().count().then((count)=>{
    //     console.log(`Todos count:${count}`);
    // },(err)=>{
    //     console.log('Unable to fetch Todos', err);
    // });

    db.collection('Users').find({
        name: 'Amitabh'
    }).toArray().then((docs)=>{
        console.log("Users data");
        console.log(JSON.stringify(docs,undefined,2))
    },(err)=>{
        console.log('Unable to fetch data for Users',err);
    });

    db.collection('Users').find().count().then((count)=>{
        console.log(`Users count:${count}`);
    },(err)=>{
        console.log('Unable to fetch data for Users',err);
    })


    //db.close();
});