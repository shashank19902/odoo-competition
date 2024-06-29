const dotenv = require('dotenv');
const express = require('express');
const cookieParser = require('cookie-parser')
const app = express();
app.use(cookieParser());
dotenv.config({ path: './config.env' });

const cors = require('cors')

const port = process.env.PORT || 8080;

require('./db/db')

app.use(express.json());

app.use(require('./routes/auth'))

app.use(cors());

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});