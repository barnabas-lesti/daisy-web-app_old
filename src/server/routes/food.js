const restifyErrors = require('restify-errors');

const Food = require('../models/Food');

const food = server => {
	server.post('/food', async (req, res, next) => {
		const foodDoc = await Food.create(req.params);
		res.send(foodDoc);
		return next();
	});

	server.get('/food', async (req, res, next) => {
		const foodDocs = await Food.find({});
		res.send(foodDocs);
		return next();
	});

	server.get('/food/:id', async (req, res, next) => {
		const { id } = req.params;
		const foodDoc = await Food.findById(id);
		res.send(foodDoc !== null ? foodDoc : new restifyErrors.NotFoundError());
		return next();
	});

	server.put('/food/:id', async (req, res, next) => {
		const { id } = req.params;
		const result = await Food.updateOne({ _id: id }, req.params);
		res.send(result.n > 0 ? true : new restifyErrors.NotFoundError());
		return next();
	});

	server.del('/food/:id', async (req, res, next) => {
		const { id } = req.params;
		const result = await Food.deleteOne({ _id: id });
		res.send(result.n > 0 ? true : new restifyErrors.NotFoundError());
		return next();
	});
};

module.exports = food;