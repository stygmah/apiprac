var {SHA256} = require('crypto-js');
var jwt = require('jsonwebtoken');

var data = {
	id:2
};

var token = jwt.sign(data,'valar_morghulis');
console.log(token);

var decoded = jwt.verify(token, 'valar_morghulis');
console.log(decoded);

// var message = "USER NUMBER 34";

// var hash = SHA256(message).toString();

// console.log(message);
// console.log(hash);


// var data = {
// 	id: 4
// };

// var token = {
// 	data,
// 	hash: SHA256(JSON.stringify(data)+"salt").toString()
// }

// var resultHash = SHA256(JSON.stringify(token.data) + "salt").toString();

// if(resultHash === token.hash){
// 	console.log('Data not changed');
// }else{
// 	console.log('Data compromised');
// }