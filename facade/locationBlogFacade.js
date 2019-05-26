let LocationBlog = require('../models/locationBlog');

const getAll = async () => {
	return await LocationBlog.find({}).exec();
};

const getByID = async (_id) => {
	return await LocationBlog.findOne({ _id }).exec();
};

const getByInfo = async (info) => {
	return await LocationBlog.findOne({ info }).exec();
};

const add = async (info, pos, author) => {
	return await new LocationBlog({ info, pos, author }).save();
};

const like = async (likedBy, _id) => {
	return await LocationBlog.findOneAndUpdate(
		{ _id },
		{ $push: { likedBy } },
		{ new: true }
	).exec();
};

module.exports = {
    getAll,
	getByID,
	getByInfo,
    add,
    like
}