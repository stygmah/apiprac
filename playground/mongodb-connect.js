const {MongoClient, ObjectID} = require('mongodb');



MongoClient.connect('mongodb://localhost:27017/TodoApp',(err, db)=>{

	if(err){
		return console.log('Mongo Error: '+err);
	}
	console.log('Connected to Mongo');

	db.collection('Todos').insertOne({
		text:'todo something',
		completed: false
	},(err, result)=>{
		if (err) {
			return console.log('Error: '+err);
		}
		console.log(JSON.stringify(result.ops,undefined,2));
	});

	db.collection('Users').insertOne({
		name:'guillermo',
		age: 12,
		location: 'Barcelona'
	},(err, result)=>{
		if (err) {
			return console.log('Error: '+err);
		}
		console.log(JSON.stringify(result.ops,undefined,2));
	});

	db.close();
});