const express = require('express');
const router = express.Router();
const {
  createNewQuiz,
  getQuiz,
  submitQuizAnswer,
  getResults
} = require('../controllers/quiz');

router.post('/quizzes', createNewQuiz);
router.get('/quizzes/:id', getQuiz);
router.post('/quizzes/:quizId/answers', submitQuizAnswer);
router.get('/quizzes/:quizId/results', getResults);

module.exports = router;
