var Twitter = require('twitter');
var request = require('request');

var client = new Twitter({
	consumer_key: 'thp6zTGxCNte6HI8vlZGpNPpt',
	consumer_secret: 'PGaLeK8eQ1Qfic7rZNuD94c8g2PLqnKPS64CqcDJ1g6xO3yBzn',
  access_token_key: '17641294-STYshQ5JsvoGRctfF1ofy5wtds07VbSnTS3e4HKbh',
  access_token_secret: '8X59I6iXp70SoJzAKg3Ba0FvrIOqNI8D5wytAeGNc6IAi'
});

var params = {screen_name: 'danrhendrix'};
// client.get('statuses/user_timeline', params, function(error, tweets, response) {
//   if (!error) {
//     console.log(tweets);
//   }
// });
var getTweets = function(callback) {
	// var stream = client.stream('statuses/filter' , {track: 'nyc', locations: '-122, 26, -68, 47'})
	var stream = client.stream('statuses/sample.json')
	var tweetStream = [];
	var results = [];
	stream.on('data', event => {
		console.log(event.text)

			if (event.user) {
				var propertiesObject = { address: event.user.location };
				request.get({
					url: 'http://maps.googleapis.com/maps/api/geocode/json',
					'Content-Type': 'application/json',
					qs: propertiesObject
				}, function(err, resp, body) {
						var responseObj = JSON.parse(body)
						if (responseObj.results[0]) {
							if (tweetStream.length < 10) {
								tweetStream.push([event.text, responseObj.results[0].geometry.location]);
							} else {
								callback(tweetStream)
								stream.destroy();
							}
						}
				});
			} else {
				console.log('no user info')
			// console.log('destroying!')			
			// stream.destroy();		
			};
		// console.log('tweetStream!!!!!!!!!!! ', tweetStream)	
	});

	stream.on('error', err => {
		throw err;
	});
}



module.exports = {
	getTweets
}




// var request = require('request');
// var hmacsha1 = require('hmacsha1');
// // var OAuth = require('oauthio-web');
// var q = require('querystring');

// // OAuth.initialize('thp6zTGxCNte6HI8vlZGpNPpt');

// function makeRandom() {
//     var text = "";
//     var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

//     for( var i=0; i < 32; i++ )
//         text += possible.charAt(Math.floor(Math.random() * possible.length));

//     return text;
// }

// var hash = hmacsha1('PGaLeK8eQ1Qfic7rZNuD94c8g2PLqnKPS64CqcDJ1g6xO3yBzn&8X59I6iXp70SoJzAKg3Ba0FvrIOqNI8D5wytAeGNc6IAi', "GET&https%3A%2F%2Fapi.twitter.com%2F1%2Fstatuses%2Fsample.json&oauth_consumer_key%3Dthp6zTGxCNte6HI8vlZGpNPpt%26oauth_nonce%3DS4uOAeyIy9WGVlRGLj7LtMNGKr9MOZBH%26oauth_signature_method%3DHMAC-SHA1%26oauth_timestamp%3D1318622958%26oauth_token%317641294-STYshQ5JsvoGRctfF1ofy5wtds07VbSnTS3e4HKbh%26oauth_version%3D1.0")


// function test() {


// 		request.get({
// 			url: 'https://stream.twitter.com/1.1/statuses/sample.json',
// 			// 'Content-Type': 'application/x-www-form-urlencoded',
// 			OAuth: {
// 				consumer_key: 'thp6zTGxCNte6HI8vlZGpNPpt',
// 				nonce: makeRandom().toString('base64'),
// 				signature: hash.toString('base64'),
// 				signature_method: 'HMAC-SHA1',
// 				timestamp: '1318622958',
// 				token: '17641294-STYshQ5JsvoGRctfF1ofy5wtds07VbSnTS3e4HKbh',
// 				version: '1.0'
// 			}
// 		}, function(e, r, body) {
// 			console.log(e)
// 			console.log(r)
// 			// console.log(body)
// 			console.log('heres the signataure: ', hash.toString('base64'));
// 			console.log('original hash: ', hash)
// 		});
// }
// test()

// module.exports = {
// 	test
// }

//'S4uOAeyIy9WGVlRGLj7LtMNGKr9MOZBH'

// include_entities=true&oauth_consumer_key=thp6zTGxCNte6HI8vlZGpNPpt&oauth_nonce=S4uOAeyIy9WGVlRGLj7LtMNGKr9MOZBH
// &oauth_signature_method=HMAC-SHA1&oauth_timestamp=1318622958&
// oauth_token=17641294-STYshQ5JsvoGRctfF1ofy5wtds07VbSnTS3e4HKbh&
// oauth_version=1.0

// GET&https%3A%2F%2Fapi.twitter.com%2F1%2Fstatuses%2Fsample.json&include_entities%3Dtrue%26
// oauth_consumer_key%3Dthp6zTGxCNte6HI8vlZGpNPpt%26oauth_nonce%3DS4uOAeyIy9WGVlRGLj7LtMNGKr9MOZBH%26
// oauth_signature_method%3DHMAC-SHA1%26oauth_timestamp%3D1318622958%26
// oauth_token%317641294-STYshQ5JsvoGRctfF1ofy5wtds07VbSnTS3e4HKbh%26oauth_version%3D1.0

// PGaLeK8eQ1Qfic7rZNuD94c8g2PLqnKPS64CqcDJ1g6xO3yBzn&8X59I6iXp70SoJzAKg3Ba0FvrIOqNI8D5wytAeGNc6IAi

