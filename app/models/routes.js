module.exports = function(app,passport){

	
	//Home Page
	app.get('/',function(req,res){
		res.render('index.ejs');
	});
	
	
	//SignUp Page
	app.get('/signup',function(req,res){
		res.render('signup',{message :req.flash('Sign Up message')});
	});

    // POST method to signup

    app.post('/signup',passport.authenticate('local-signup',{
        successRedirect : '/profile',       // redirect to the secure profile section
        failureRedirect : '/signup',        // redirect back to the signup page if there is an error
        failureFlash    :  true             // allow flash messages

    }));
	
	//Show Login Page
	app.get('/login',function(req,res){
		res.render('login',{message: req.flash("Successfully Logged in ")});
	});

	// Post method for the Login

    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));
	
	// If user is verified or If User has logged in then only show the profile page
	//use isloggedin function.
	
	app.get('/profile',isLoggedIn,function(req,res){
		res.render('profile',{
			user:req.user});
	});	
    
	
	//Logout Page
	app.get('/logout',function(req,res){
		req.logout();
		res.redirect('/');
	});
}

function isLoggedIn(req,res,next){
	
	if(req.isAuthenticated())
		return next();
	
	res.redirect('/');
}