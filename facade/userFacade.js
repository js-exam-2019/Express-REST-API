let User = require('../models/user');

const getAll = async () => {
	return await User.find({}).exec();
};

const getByID = async (_id) => {
	return await User.findOne({ _id }).exec();
};

const getByUsername = async (username) => {
	return await User.findOne({ username }).exec();
};

const add = async (firstName, lastName, username, password, email) => {
	return await new User({ firstName, lastName, username, password, email }).save();
};

module.exports = {
	getAll,
	getByID,
	getByUsername,
	add
};
