const express = require('express');
const app = express();
const port = 3001;

console.log('🔥 Starting TEST server...');

app.get('/test', (req, res) => {
  console.log('🟢 /test route hit');
  res.send('🟢 Express is working!');
});

app.listen(port, () => {
  console.log(`🚀 Test server running at http://localhost:${port}`);
});