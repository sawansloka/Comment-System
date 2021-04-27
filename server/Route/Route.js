const router = require('express').Router();
const { ViewComments, AddComment, SearchComment } = require('../API/Comment');

router.get('/view-comments', ViewComments);
router.post('/add-comment', AddComment);
router.post('/search-comment', SearchComment);

module.exports = router;
