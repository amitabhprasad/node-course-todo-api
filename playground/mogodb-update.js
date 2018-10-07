//const MongoClient = require('mongodb').MongoClient;

const {MongoClient,ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
    if(err){
        return console.log("Unable to connect to MongoDB Server ",err);
    }
    console.log('Connected to MongoDB server');

    // db.collection('Todos').findOneAndUpdate({
    //     _id: new ObjectID('5bba0f1991c475fffdca25d5')
    // },{
    //     $set: {
    //         completed: true
    //     }
    // },{
    //     returnOriginal: false
    // }).then((results)=>{
    //     console.log(results);
    // },(err)=>{
    //     console.log('Unable to updated ',err);
    // });

    db.collection('Users').findOneAndUpdate({
        name: 'Mike'
    },{
        $set: {
            name: 'Jen'
        },
        $inc: {
            age: 1
        }
    },{
        returnOriginal: false
    }).then((results)=>{
        console.log(JSON.stringify(results,undefined,2));
    },(err)=>{
        console.log('Unable to updated ',err);
    })
    //db.close();
});