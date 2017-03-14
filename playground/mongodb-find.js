const {MongoClient, ObjectID} = require('mongodb');



MongoClient.connect('mongodb://localhost:27017/TodoApp',(err, db)=>{

	if(err){
		return console.log('Mongo Error: '+err);
	}
	console.log('Connected to Mongo');

	db.collection('Todos').find().count().then((count)=>{
		console.log(`Todos count:${count}`);
	},(err)=>{
		console.log(err);
	});




	//db.close();
});