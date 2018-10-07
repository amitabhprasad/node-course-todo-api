//const MongoClient = require('mongodb').MongoClient;

const {MongoClient,ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
    if(err){
        return console.log("Unable to connect to MongoDB Server ",err);
    }
    //deleteMany
    // db.collection('Todos').deleteMany({text: 'Eat Lunch'})
    // .then((result)=>{
    //     console.log(result);
    // },(err)=>{
    //     console.log('Unable to delete records',err)
    // });

    //deleteOne
    // db.collection('Todos').deleteOne({text: 'Eat Lunch'})
    // .then((result)=>{
    //     console.log(result);
    // },(err)=>{
    //     console.log('Unable to delete records',err);
    // });

    //findOneAndDelete
    // db.collection('Todos').findOneAndDelete({
    //     completed: false
    // }).then((result)=>{
    //     console.log(result);
    // },(err)=>{
    //     console.log('Unable to find and delete records',err);
    // })

    //delete data form Users collection
    // db.collection('Users').deleteMany({
    //     name: 'Amitabh'
    // }).then((result)=>{
    //     console.log(result);
    // },(err)=>{
    //     console.log('Unable to delete records',err);
    // });

    db.collection('Users').findOneAndDelete({
        _id: new ObjectID('5bb9e2257025bbbd895b6b2c')
    }).then((result)=>{
        console.log(JSON.stringify(result,undefined,2));
    },(err)=>{
        console.log('Unable to find one and delete records',err);
    })
    //db.close();
});