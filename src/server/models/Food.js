const mongoose = require('mongoose');

const calculateServingMultiplier = (serving, macro) => serving === 0 ? 0 : macro / serving;

const foodSchema = new mongoose.Schema({
	macros: {
		calories: {
			value: {
				default: 0,
				type: Number,
			},
		},
		carbs: {
			value: {
				default: 0,
				type: Number,
			},
		},
		fat: {
			value: {
				default: 0,
				type: Number,
			},
		},
		protein: {
			value: {
				default: 0,
				type: Number,
			},
		},
	},
	name: String,
	serving: {
		unit: {
			default: 'g',
			type: String,
		},
		value: {
			default: 0,
			type: Number,
		},
	},
}, {
	id: false,
	toJSON: {
		versionKey: false,
		virtuals: true,
	},
	toObject: {
		versionKey: false,
		virtuals: true,
	},
});

foodSchema.virtual('macros.calories.servingMultiplier').get(function () {
	return calculateServingMultiplier(this.serving.value, this.macros.calories.value);
});

foodSchema.virtual('macros.carbs.servingMultiplier').get(function () {
	return calculateServingMultiplier(this.serving.value, this.macros.carbs.value);
});

foodSchema.virtual('macros.fat.servingMultiplier').get(function () {
	return calculateServingMultiplier(this.serving.value, this.macros.fat.value);
});

foodSchema.virtual('macros.protein.servingMultiplier').get(function () {
	return calculateServingMultiplier(this.serving.value, this.macros.protein.value);
});

module.exports = mongoose.model('Food', foodSchema);
