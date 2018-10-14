const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

var {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos = [{
    _id: new ObjectID(),
    text: 'First test todo'
},{
    _id: new ObjectID(),
    text: 'Cook dinner'
},{
    _id: new ObjectID(),
    text: 'Go for movie'
},{
    _id: new ObjectID(),
    text: 'Watch debate'
}];

beforeEach((done)=>{
    Todo.remove({}).then(()=>{
        return Todo.insertMany(todos);
    }).then(()=> done())
})
describe('POST /todos',()=>{
    it('Should create a new todo',(done)=>{
        var text = 'Test todo text';
        request(app)
               .post('/todos')
               .send({
                   text: text
               })
               .expect(200)
               .expect((res)=>{
                    expect(res.body.text).toBe(text)
               })
               .end((err,response)=>{
                   if(err){
                       return done(err);
                   }

                   Todo.find({text:text}).then((todos)=>{
                       expect(todos.length).toBe(1);
                       expect(todos[0].text).toBe(text);
                       done();
                   }).catch((err)=>{
                       done(err);
                   });
               })
    });

    it('Should not create Todo, to cover failure scenario',(done)=>{
        var text = '     T         ';
        request(app)
               .post('/todos')
               .send({
                   text: text
               })
               .expect(400)
               .end((err,response)=>{
                   if(err){
                       return done(err);
                   }
                   Todo.find().then((todos)=>{
                    expect(todos.length).toBe(4);
                    done();
                   }).catch((err)=>{
                    done(err);
                   });
               })
    })
})

describe('GET /todos',()=>{
    it('should GET all todos',(done)=>{
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res)=>{
                expect(res.body.todos.length).toBe(4);
            })
            .end(done);
    })
});

describe('GET /todos/:id',()=>{
    it('should return Todo doc',(done)=>{
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res)=>{
                expect(res.body.todo.text).toBe(todos[0].text);
            })
            .end(done);
    });

    it('Should return 404 todo not found',(done)=>{
        //should return 404
        var id = new ObjectID().toHexString();
        request(app)
            .get(`/todos/${id}`)
            .expect(404)
            .end(done);
    });

    it('Should return 404 for non object id',(done)=>{
        //should return 404
        request(app)
            .get('/todos/1234')
            .expect(404)
            .end(done);
    });
});