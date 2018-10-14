const expect = require('expect');
const request = require('supertest');

var {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos = [{
    text: 'First test todo'
},{
    text: 'Cook dinner'
},{
    text: 'Go for movie'
},{
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