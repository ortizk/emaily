const passport = require('passport');


module.exports = (app) => {
	app.get('/auth/google', passport.authenticate('google', {
		scope: ['profile', 'email']
		})
	);

	app.get('/auth/google/callback', passport.authenticate('google'));

	app.get('/api/logout', (req, res) => {
		// logout is a function provided by passport. 
		// takes the cookie and kills the id in it
		req.logout();
		res.send(req.user);
	})

	app.get('/api/current_user', (req, res) => {
		res.send(req.user);
	});
};