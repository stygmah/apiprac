const {MongoClient, ObjectID} = require('mongodb');



MongoClient.connect('mongodb://localhost:27017/TodoApp',(err, db)=>{

	if(err){
		return console.log('Mongo Error: '+err);
	}
	console.log('Connected to Mongo');

	db.collection('Todos').deleteOne({text:'Eat lunch'}).then((result)=>{
		console.log(result);
	});

	//db.close();
});