const express = require('express');
const bodyParser = require('body-parser');
const quizRoutes = require('./routes/quiz');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/api', quizRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});