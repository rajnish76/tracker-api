const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

const connectdb = require('./config/db');
const authRouter = require('./routes/authRoutes');
const trackRouter = require('./routes/trackRoutes');

dotenv.config({ path: './config/config.env' });

connectdb();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(authRouter);
app.use(trackRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
