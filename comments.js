//Create a web browser
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Comment = mongoose.model('Comment');

//GET ALL COMMENTS
router.get('/', function(req, res, next) {
    Comment.find(function(err, comments){
        if(err){ return next(err); }

        res.json(comments);
    });
});

//POST COMMENT
router.post('/', function(req, res, next) {
    var comment = new Comment(req.body);

    comment.save(function(err, comment){
        if(err){ return next(err); }

        res.json(comment);
    });
});

//PRELOAD COMMENT OBJECTS
router.param('comment', function(req, res, next, id) {
    var query = Comment.findById(id);

    query.exec(function (err, comment){
        if (err) { return next(err); }
        if (!comment) { return next(new Error("can't find comment")); }

        req.comment = comment;
        return next();
    });
});

//GET COMMENT
router.get('/:comment', function(req, res) {
    res.json(req.comment);
});

//DELETE COMMENT
router.delete('/:comment', function(req, res) {
    req.comment.remove();
    res.sendStatus(200);
});

//UPVOTE COMMENT
router.put('/:comment/upvote', function(req, res, next) {
    req.comment.upvote(function(err, comment){
        if (err) { return next(err); }

        res.json(comment);
    });
});

//DOWNVOTE COMMENT
router.put('/:comment/downvote', function(req, res, next) {
    req.comment.downvote(function(err, comment){
        if (err) { return next(err); }

        res.json(comment);
    });
});

//EXPORT MODULE
module.exports = router;
