let quizzes = [];

function createQuiz(quiz) {
  const id = Math.random().toString(36).substring(7);
  const newQuiz = { id, ...quiz };
  quizzes.push(newQuiz);
  return newQuiz;
}

function getQuizById(id) {
  return quizzes.find(quiz => quiz.id === id);
  
}

function getAllQuizzes() {
  return quizzes;
}

module.exports = { 
    createQuiz, 
    getQuizById, 
    getAllQuizzes 
};