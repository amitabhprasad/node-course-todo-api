const mongoose = require('mongoose');
const validator = require('validator')
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        minlength: 5,
        trim: true,
        unique: true,
        validate: {
          validator: (value)=>{
              return validator.isEmail(value);
          },
          message: '{VALUE} is not a valid email'  
        }
    },
    password: {
        type: String,
        required : true,
        minlength: 6
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token:{
            type: String,
            required: true
        }
    }]
});

UserSchema.methods.generateAuthToken = function () {
    var user = this;
    var access = 'auth';
    var token = jwt.sign({_id: user._id.toHexString(),access:access},'abc123').toString();

    //user.token.push
    user.tokens.push({
        access:access,
        token:token
    });

    return user.save().then(()=>{
        return token;
    });
}

UserSchema.methods.toJSON = function (){
    var user = this;
    var userObject = user.toObject();

    return _.pick(userObject,['_id','email']);
}

UserSchema.statics.findByToken = function(token){
    var User = this;
    var decoded;

    try{
         decoded = jwt.verify(token,'abc123');
        console.log("decoded : ",decoded);
    }catch(err){
        return new Promise((resolve,reject)=>{
            reject();
        });
    }

    return User.findOne({
        '_id': decoded._id,
        'tokens.token':token,
        'tokens.access':'auth'
    });
    
}

UserSchema.pre('save',function(next){
    var user = this;
    if(user.isModified('password')){
        console.log("password modified");
        bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(user.password,salt,(err,hash)=>{
                user.password = hash;
                next();
            });
        });
    }else{
        next();
    };
});

var User = mongoose.model('User',UserSchema);

module.exports = {
    User: User
};