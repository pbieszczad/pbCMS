var express = require('express');
var router = express.Router();
var path = require('path');
var multer = require('multer');
var slugify = require('helpers/slugify');
var fileExists = require('helpers/file-exists');

router.use('/', ensureAuthenticated);
router.use('/', express.static('../client/admin'));
module.exports = router;


// middleware

function ensureAuthenticated(req, res, next){
	// uzycie sesji do zabezpieczenia strony admina
	if(!req.session.token){
		return res.redirect('/login?returnUrl=' + encodeURIComponent('/admin' + req.path));
	}
	next();
}
