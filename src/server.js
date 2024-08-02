require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const cors = require('cors');
const { TOKEN } = require('./config');


const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use('/api', routes);
console.log('Loaded TOKEN:', TOKEN);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
