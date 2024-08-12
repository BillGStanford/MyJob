const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const upload = multer({ dest: 'uploads/' });
app.post('/api/post-job', upload.single('thumbnail'), (req, res) => {
  // Logic for posting job
  res.json({ message: 'Job posted!' });
});

app.get('/api/jobs', (req, res) => {
  // Logic to fetch jobs
  res.json([]);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
