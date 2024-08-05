const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routes');
const logger = require('./logger');
const { TOKEN } = require('./config');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use('/api', routes);
logger.info('Сервер запущен');
logger.info(TOKEN);


app.listen(port, () => {
  logger.info(`Сервер запущен на http://localhost:${port}`);
});
