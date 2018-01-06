var express = require('express');
var app = express();
var router = express.Router();
var multer  = require('multer');
var bodyParser = require('body-parser');
//
app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "http://localhost");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });
var storage = multer.diskStorage({ //multers disk storage settings
        destination: function (req, file, cb) {
            cb(null, '../uploads/pages')
        },
        filename: function (req, file, cb) {
            cb(null,  file.originalname)
        }
    });
var upload = multer({ //multer settings
                storage: storage
            }).single('file');

router.post('/page', function(req, res) {
    upload(req,res,function(err){
      console.log('test');
        if(err){
             res.json({error_code:1,err_desc:err});
             return;
        }
         res.json({error_code:0,err_desc:null});
    });
});

module.exports = router;
