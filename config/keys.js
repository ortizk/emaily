if (process.env.NODE_ENV === 'production'){
	console.log('Prod Load')
	// we are in production = return the prod set of keys
	module.exports = require('./prod');
} else {
	console.log('dev Load')
	// we are in development = return the dev keys
	module.exports = require('./dev');
}


