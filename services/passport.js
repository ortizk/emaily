 const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');


const User = mongoose.model('users');


//for cookies 
passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id)
	.then(user => {
		done(null, user);
	});
});

// this sends the user to google to give permission for my site to use their information then sends them back to the callbackurl which is my site
// if you would like to use another strategy, wire it up here and also change the routes to match.
passport.use(
	new GoogleStrategy(
	{
		clientID: keys.googleClientID,
		clientSecret: keys.googleClientSecret,
		callbackURL: '/auth/google/callback',
		// google was coming back without https. It was going though a proxy, Heroku, and it doesn't trust the security of proxys. Therefor, it was changing the security. This tells it to trust me
		proxy: true
	}, 
	async (accessToken, refreshToken, profile, done) => {
		// we have to check if the user exists in db so that it doesn't add twice
		const existingUser = await User.findOne({ googleId: profile.id });
		if (existingUser) {
			// we already have a record with the given Profile Id
			return done(null, existingUser);
		} 
		// we don't have a user record with this ID, make a new record
		const user = await new User({ googleId: profile.id }).save();
		done(null, user);
		
	
	}
	)
);

