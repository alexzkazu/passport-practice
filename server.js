var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/testdb');

var express  = require('express'),
	app 	 = express(),
	http 	 = require('http'),
	passport = require('passport'),
	FacebookStrategy = require('passport-facebook').Strategy;

passport.use(new FacebookStrategy({
    clientID: ,
    clientSecret: '',
    callbackURL: "http://localhost:8000/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate({
            'facebook.id': profile.id
        }, function(err, user) {
      if (err) { return done(err); }
      done(null, user);
    });
  }
));

app.get('/login',function(req,res){
	res.sendfile('index.html');
});

// Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /auth/facebook/callback
app.get('/auth/facebook', passport.authenticate('facebook'));

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
app.get('/auth/facebook/callback', 
  passport.authenticate('facebook', { successRedirect: '/test',
                                      failureRedirect: '/login' }));

app.listen(8000);