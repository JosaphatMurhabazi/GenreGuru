const express = require('express');
const genres = require('./routes/genres');
const home = require('./routes/home');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/genres', genres);
app.use('/', home);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
