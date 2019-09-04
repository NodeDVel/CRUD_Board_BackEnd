const express = require('express');
const router = express.Router();

const Board = require('../models/borad');   
const Comment = require('../models/comment');

router.get('/', (req, res) => {
    try{
        alert('123');
    }catch(err){
        console.error(err);
    }
});
router.get('/test', (req, res) => {
    res.send("<script>alert('test Ok')</script>");
});

router.post('/board/write', (req, res) => {
    const board = new Board();
    board.title = req.body.title;
    board.contents = req.body.contents;
    board.author = req.body.author;

    board.save(err => {
        if(err){
            console.error(err);
            res.redirect('/');
        }
        res.redirect('/');
    });
});

router.get('/board/:id', (req, res) => {
    Board.findOne({ _id: req.params.id }, (err, board) => {
        res.render('board', { title: 'Board', board: board });
    });
});

router.post('/comment/write', (req, res) => {
    const comment = new Comment();
    comment.contents = req.body.contents;
    comment.author = req.body.author;

    Board.findOneAndUpdate({ _id: req.body.id }, { $push: {comments: comment}}, (err, board) => {
        if(err){
            console.error(err);
            res.redirect('/');
        }
        res.redirect('board' + req.body.id);
    });
});

router.delete('/delete', (req, res) => {
    Board.remove({_id: req.params.id}, err => {
        console.error(err);
        res.redirect('/board/write');
    });
});
module.exports = router;