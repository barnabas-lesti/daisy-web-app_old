module.exports = {
	env: {
		"es6":  true,
		"node": true,
	},
	extends: [
		"eslint:recommended",
		"recommended/node",
		"recommended/node/style-guide"
	],
	plugins: [
		"import",
		"sort-requires-by-path"
	],
	parserOptions: {
		"ecmaVersion": 6,
		"sourceType":  "module"
	},
	rules: {
		"indent": [
			2,
			"tab"
		],
		"comma-dangle": [
			2,
			"always-multiline"
		],
		"semi": [
			2,
			"always"
		],
		"curly": [
			2,
			"all"
		],
		"sort-keys": 2,
		"sort-vars": 2,
		"one-var": [
			2,
			"never"
		],
		"no-sync": 2,
		"no-else-return": 0,
		"no-invalid-this": 0,
		"class-methods-use-this": 0,
		"sort-requires-by-path/sort-requires-by-path": 2,
		"import/no-commonjs": 0,
		"import/no-nodejs-modules": 0
	},
};
