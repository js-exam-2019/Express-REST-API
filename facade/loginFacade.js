let User = require('../models/user');
let Position = require('../models/position');

const login = async (username, password, longitude, latitude, distance) => {
	const user = await User.findOne({ username, password }).exec();

	if (!user) return { msg: 'wrong userName or password', status: 403 };

	const coordinates = [longitude, latitude];
	await Position.findOneAndUpdate(
		{ user: user._ud },
		{ user, created: Date.now(), loc: { type: 'Point', coordinates } },
		{ upsert: true, new: true }
	).exec();

	const friendsPosition = await getFriendsInDistance(coordinates, distance);
	return filterFriends(friendsPosition);
};

const getFriendsInDistance = async (coordinates, distance) => {
	return await Position.find({
		loc: {
			$near: {
				$geometry: { type: 'Point', coordinates },
				$minDistance: 0.01,
				$maxDistance: distance
			}
		}
	}).populate('user');
};

const filterFriends = (friendsPosition) => {
	return friendsPosition.map((friendPosition) => {
		return {
			username: friendPosition.user.username,
			latitude: friendPosition.loc.coordinates[0],
			longitude: friendPosition.loc.coordinates[1]
		};
	});
};

module.exports = { login };
