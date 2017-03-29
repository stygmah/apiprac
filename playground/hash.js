var {SHA256} = require('crypto-js');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

var password = '123Abc!';

// bcrypt.genSalt(12, (err,salt)=>{
// 	bcrypt.hash(password, salt, (err,hash)=>{
// 		if (err) {
// 			return console.log('ERROR: ',err);
// 		};
// 		console.log(hash);
// 	});
// });

var hashedVal = '$2a$12$hrkCL8lGERydQlJ34CyiR.YRXUdZZmWgAj4VkV3o4uBdh5/InTBDG';

bcrypt.compare(password,hashedVal, (err,res)=>{
	console.log(res);
});





// var data = {
// 	id:2
// };

// var token = jwt.sign(data,'valar_morghulis');
// console.log(token);

// var decoded = jwt.verify(token, 'valar_morghulis');
// console.log(decoded);

// // var message = "USER NUMBER 34";

// // var hash = SHA256(message).toString();

// // console.log(message);
// // console.log(hash);


// // var data = {
// // 	id: 4
// // };

// // var token = {
// // 	data,
// // 	hash: SHA256(JSON.stringify(data)+"salt").toString()
// // }

// // var resultHash = SHA256(JSON.stringify(token.data) + "salt").toString();

// // if(resultHash === token.hash){
// // 	console.log('Data not changed');
// // }else{
// // 	console.log('Data compromised');
// // }