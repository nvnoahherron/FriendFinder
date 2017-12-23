var friendsData = require("../data/friends.js");

module.exports = function(app){

	app.get("/api/friends", function(request, response){
		response.json(friendsData);
	});
	app.post("/api/friends", function(request, response){

		var newFriend = request.body;
		friendsData.push(newFriend);
		var userResponse = newFriend['results[]'];
		var bestFriend = {};
		var tempBestFriend = {};
		tempBestFriend.difference = 100;

		for (var i = 0; i < friendsData.length; i++) {
			var difference = 0;
			for (var a = 0; a < userResponse.length; a++) {
			//	console.log(friendsData[i].results[a]);
				difference += Math.abs(friendsData[i]['results[]'][a] - userResponse[a]);
			}

			if (difference < tempBestFriend.difference) {
				tempBestFriend.index = i;
				tempBestFriend.difference = difference;
			}
		}

		// tempBestFriend.index = 3
		// friendsData[] === friendsData[tempBestFriend.difference]

		bestFriend = friendsData[tempBestFriend.difference];

		response.json(bestFriend);
	});
	// create a function 
	// function should loop through friendsdata
	// have a nested loop for the results
	// compare the difference / get difference for each question in results
	// for each friend
	// add the difference in the nested loop assign that to friend as the score
	// check to see who has lowest score
	// return as the bestfriend
	// Math.abs()
};