var _ = require('lodash');
var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');
var {mongoose}= require('./db/mongoose');
var {Todo} = require('./models/Todo');
var {User} = require('./models/User');
var {authenticate} = require('./middleware/authenticate')

var app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());



//post
app.post('/todos',(req,res)=>{
	var todo = new Todo({
		text: req.body.text
	})
	todo.save().then((doc)=>{
		res.status(200).send(doc);
	},(e)=>{
		res.status(400).send(e);
	});
});
app.post('/users',(req,res)=>{
	var body = _.pick(req.body,['email','password']);
	var user = new User(body);
	user.save().then(()=>{
		return user.generateAuthToken();
	}).then((token)=>{
		res.header('x-auth',token).send(user);
	}).catch((e)=>{
		res.status(400).send(e);
	});
});

//geters
app.get('/todos',(req,res)=>{
	Todo.find().then((todos)=>{
		res.status(200).send({todos});
	},(e)=>{
		res.status(400).send(e);
	});
});
app.get('/todos/:id',(req,res)=>{
	var id = req.params.id
	if(!ObjectID.isValid(id)){
		return res.status(404).send('404');
	}
	Todo.findById(id).then((todo)=>{
		if(!todo){
			res.status(404).send();
		}
		res.status(200).send({todo});
	},(e)=>{
		res.status(400).send(e);
	});
});




app.get('/users/me', authenticate,(req,res)=>{
	res.send(req.user);
});

//delete
app.delete('/todos/:id',(req,res)=>{
	var id = req.params.id
	if(!ObjectID.isValid(id)){
		return res.status(404).send('404');
	}
	Todo.findByIdAndRemove(id).then((todo)=>{
		if(!todo){
			res.status(404).send();
		}
		res.status(200).send({todo});
	},(e)=>{
		res.status(400).send(e);
	});
});
//update
app.patch('/todos/:id',(req,res)=>{
	var id = req.params.id;
	var body = _.pick(req.body,['text','completed']);
	if(!ObjectID.isValid(id)){
		return res.status(404).send('404');
	}
	
	if(_.isBoolean(body.completed)&& body.completed){
		body.completedAt = new Date().getTime();
	}else{
		body.completed = false;
		body.completedAt = null;
	}

	Todo.findByIdAndUpdate(id, {$set: body}, {new:true}),then((todo)=>{
		res.status(200).send(todo);
	},(e)=>{
		res.status(404).send();
	});

});


app.listen(port,()=>{
	console.log('server listening on port',port);
});


module.exports = {
	app
}