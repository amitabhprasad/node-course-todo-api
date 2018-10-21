const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const brypt = require('bcryptjs');


var password = '1231bc!';
brypt.genSalt(10,(err,salt)=>{
    brypt.hash(password,salt,(err,hash)=>{
        console.log("HASH ***** ",hash);
    });
});

var hashedPassword='$2a$10$s8QOgz2XF.pfAs4yCKTGeurhyaFSpTTXP1Lq3NWoIrMUFeQAwblJ2';

brypt.compare(password,hashedPassword,(err,result)=>{
    console.log(result);
});
var data ={
    id: 10
}

var token = jwt.sign(data,'123abc');
console.log(`TOKEN: ${token}`);

var decoded = jwt.verify(token,'123abc');

console.log('DECODED:', decoded);

// var message = 'I am user 123';
// var hash = SHA256(message).toString();

// console.log(`MESSAGE: ${message}`);
// console.log(`HASH: ${hash}`);

// var data = {
//     id:4
// };

// var token = {
//     data:data,
//     hash: SHA256(JSON.stringify(data)+'somesecret').toString()
// };

// // token.data.id = 5;
// // token.hash = SHA256(JSON.stringify(data)).toString();

// var resultHash = SHA256(JSON.stringify(token.data)+'somesecret').toString();

// if(resultHash === token.hash){
//     console.log('data was not changed');
// }else{
//     console.log('data modified');
// }
