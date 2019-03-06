const restifyErrors = require('restify-errors');

const Food = require('../models/Food');

const convertParamsToDocument = params => params;
const convertDocumentToResponse = doc => doc;

module.exports = server => {
	server.get('/api/food', async (req, res, next) => {
		const { searchQuery } = req.query;
		const findConditions = {};
		if (searchQuery) {
			findConditions.name = new RegExp(
				searchQuery
					.split(',')
					.map(fragment => fragment.trim())
					.join('|'),
				'i'
			);
		}
		const docs = await Food.find(findConditions);
		res.send(docs.map(doc => convertDocumentToResponse(doc)));
		return next();
	});

	server.get('/api/food/:_id', async (req, res, next) => {
		const doc = await Food.findById(req.params._id);
		res.send(doc !== null ? convertDocumentToResponse(doc) : new restifyErrors.NotFoundError());
		return next();
	});

	server.put('/api/food', async (req, res, next) => {
		const doc = await Food.create(convertParamsToDocument(req.params));
		res.send(convertDocumentToResponse(doc));
		return next();
	});

	server.patch('/api/food/:_id', async (req, res, next) => {
		const { _id } = req.params;
		const result = await Food.updateOne({ _id }, convertParamsToDocument(req.params));
		res.send(result.n > 0 ? true : new restifyErrors.NotFoundError());
		return next();
	});

	server.del('/api/food/:_id', async (req, res, next) => {
		const { _id } = req.params;
		const result = await Food.deleteOne({ _id });
		res.send(result.n > 0 ? true : new restifyErrors.NotFoundError());
		return next();
	});
};
