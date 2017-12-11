var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Page= require('../../models/page.model.js');

// strony
router.get('/pages', function(req, res){
	return Page.find(function(err, pages){
		if(!err){
			return res.send(pages);
		}else{
			return res.send(500, err);
		}
	});
});

router.post('/pages/add', function(req,res){
	var page = new Page({
		title:req.body.title,
		url:req.body.url,
		content:req.body.content,
		menuIndex: req.body.menuIndex,
		date:new Date(Date.now())
	});

	page.save(function(err){
		if(!err){
			return res.send(200, page);
		}else{
			return res.send(500, err);
		}
	});
});

router.post('/pages/update', /*sessionCheck,*/ function(request, response) {
    var id = request.body._id;

    Page.update({
        _id: id
    }, {
        $set: {
            title: request.body.title,
            url: request.body.url,
            content: request.body.content,
            menuIndex: request.body.menuIndex,
            date: new Date(Date.now())
        }
    }).exec();
    response.send("Page updated");
});

router.get('/pages/delete/:id', /*sessionCheck,*/ function(request, response) {
    var id = request.params.id;
    Page.remove({
        _id: id
    }, function(err) {
        return console.log(err);
    });
    return response.send('Page id- ' + id + ' has been deleted');
});

router.get('/pages/admin-details/:id', /*sessionCheck,*/ function(request, response) {
    var id = request.params.id;
    Page.findOne({
        _id: id
    }, function(err, page) {
        if (err)
            return console.log(err);
        return response.send(page);
    });
});

router.get('/pages/details/:url', function(request, response) {
    var url = request.params.url;
    Page.findOne({
        url: url
    }, function(err, page) {
        if (err)
            return console.log(err);
        return response.send(page);
    });
});

module.exports = router;