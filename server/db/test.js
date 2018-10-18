const fs = require('fs');
const childProcess = require('child_process');

console.log("Started ");
var x = 1000;

var myFunc = function (){
    for(var x=0;x<1000;x++){
        console.log("called myFunc ==> "+x);
    }
        
}

function testMyFunction(){
    for(var x=0;x<1000;x++){
        console.log("called testMyFunction ==> "+x);
    }
}

setTimeout(()=>{
    console.log("executed 1st timeout");
},1000);


setTimeout(()=>{
    console.log("executed 2nd timeout");
},0);

//myFunc();
//testMyFunction();

var getUser = (cb) =>{
    setTimeout(()=>{
        var user = {
            id: x,
            name: "Test User"
        }
        cb(user);
    },5);
}

getUser(function (userObj) {
    console.log(userObj);
});


var checkArgType = (arg,cb)=>{
    fs.readFile('test.js',(err,data)=>{
        if(err){
            console.log("Error ",err);
        }else{
           
            console.log("DATA ",data);
        }
    });
    
    if(typeof arg !== 'number'){
        return cb('not a number');
    }
    cb(null,`Arg passed ${arg} is a number`);
}

checkArgType(123,(err,result)=>{
    if(err){
        return console.log('Wrong value in arg ',err);
    }
    console.log(result);
});

// childProcess.execSync('copy test.js test2.js');
// console.log('Done!');

console.log("Exection complete");

