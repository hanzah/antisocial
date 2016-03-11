var settings = require('../settings.js');

class BeaconService{
	get(beacon, cb){
		fetch(settings.url + '/beacons/' + beacon.uuid + beacon.major + beacon.minor)
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

module.exports = new BeaconService();