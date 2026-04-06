const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello DevOps World! The CI/CD Pipeline was successful! 🚀');
});

app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});