const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const quizRoutes = require('../routes/quiz');
const { createQuiz } = require('../models/quiz');

const app = express();
app.use(bodyParser.json());
app.use('/api', quizRoutes);

let quizId;
// Set up a mock quiz in memory for testing
beforeAll(() => {
  const quizdata = createQuiz({
    title: 'General Knowledge Quiz',
    questions: [
      {
        id: "12345",
        text: 'What is the capital of Canada?',
        options: ['Berlin', 'Montreal', 'Ottawa', 'Rome'],
        correct_option: 2,
      },
    ],
  });
  quizId = quizdata["id"]
});

describe('Quiz API', () => {
  it('should create a new quiz', async () => {
    const res = await request(app)
      .post('/api/quizzes')
      .send({
        title: 'Science Quiz',
        questions: [
          {
            text: 'What is the chemical symbol for water?',
            options: ['H2O', 'O2', 'H2', 'HO'],
            correct_option: 0,
          },
        ],
      });

    expect(res.status).toBe(201);
    expect(res.body.title).toBe('Science Quiz');
    expect(res.body.questions).toHaveLength(1);
  });

  it('should get a quiz by ID', async () => {
    const res = await request(app).get(`/api/quizzes/${quizId}`);
    expect(res.status).toBe(200);
  });

  it('should submit an answer and return feedback', async () => {
    const res = await request(app)
      .post(`/api/quizzes/${quizId}/answers`)
      .send({
        question_id: "12345", // Replace with a valid question ID
        selected_option: 2,
      });
    expect(res.status).toBe(200);
    expect(res.body.is_correct).toBe(true);
    expect(res.body.correct_option).toBe(2);
  });

  it('should get the results for a quiz', async () => {
    const res = await request(app).get(`/api/quizzes/${quizId}/results`);
    expect(res.status).toBe(200);
    expect(res.body.score).toBe(1); // Assuming a correct answer was given
  });
});
