const { createQuiz, getQuizById } = require('../models/quiz');
const { submitAnswer, getResultsForQuiz } = require('../models/answer');

function createNewQuiz(req, res) {
  try {
    const quiz = req.body;
    const newQuiz = createQuiz(quiz);
    res.status(201).json(newQuiz);
  } catch (error) {
    res.status(500).json({ error: 'Error creating quiz' });
  }
}

function getQuiz(req, res) {
  try {
    const quizId = req.params.id;
    const quiz = getQuizById(quizId);
    const quizquestions = JSON.parse(JSON.stringify(quiz))
    const questions = quizquestions["questions"].map(element => {
        delete element["correct_option"]
        return element
    });
    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching quiz' });
  }
}

function submitQuizAnswer(req, res) {
  try {
    const { question_id, selected_option } = req.body;
    const quizId = req.params.quizId;
    const quiz = getQuizById(quizId);
    const question = quiz.questions.find(q => q.id === question_id);

    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }

    const isCorrect = question.correct_option === selected_option;
    const answer = {
      quiz_id: quizId,
      question_id,
      selected_option,
      is_correct: isCorrect
    };

    submitAnswer(answer);
    res.json({
      is_correct: isCorrect,
      correct_option: question.correct_option
    });
  } catch (error) {
    res.status(500).json({ error: 'Error submitting answer' });
  }
}

function getResults(req, res) {
  try {
    const quizId = req.params.quizId;
    const results = getResultsForQuiz(quizId);
    const score = results.filter(result => result.is_correct).length;
    res.json({ quiz_id: quizId, score, answers: results });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching results' });
  }
}

module.exports = { createNewQuiz, getQuiz, submitQuizAnswer, getResults };