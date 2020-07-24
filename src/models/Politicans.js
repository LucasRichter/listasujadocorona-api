const restful = require('node-restful')
const states = require('../helpers/states')
const mongoose = restful.mongoose
const Schema = mongoose.Schema

var politicanSchema = new Schema({
	name: { required: true, type: String, unique: true },
	profilePicture: { required: true, type: String },
	party: { required: true, type: String },
	twitter: { required: true, type: String },
	website: { type: String },
	state: { required: true, enum: states, type: String  },
	evidences: [{
		description: { required: true, type: String },
		link: { required: true, type: String }
	}],
	pageView: { type: Number, default: 0 }
})

module.exports = restful.model('PoliticansSchema', politicanSchema)