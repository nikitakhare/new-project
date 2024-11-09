let answers = [];

function submitAnswer(answer) {
  answers.push(answer);
  return answer;
}

function getResultsForQuiz(quizId) {
  return answers.filter(answer => answer.quiz_id === quizId);
}

module.exports = { 
    submitAnswer, 
    getResultsForQuiz 
};