var settings = require('../settings.js');

class CommentService{
	index(beacon, cb){
		fetch(settings.url + '/chat_rooms/' + beacon.chat_room.id + '/comments',{
			headers:{
				'auth-token': beacon.auth_token
			}
		})
		.then((response) => {
			if(response.status == 200){
				return response.json();
			}else{
				cb('Error', response);
			}
		})
		.then((response) => {
			cb(null, response);
		})
		.catch((error) => {
			cb(error, null);
		});
	}
}

module.exports = new CommentService();