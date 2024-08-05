const logger = require('./logger');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use('/api', routes);
logger.info('Сервер запущен');

app.listen(port, () => {
  logger.info(`Сервер запущен на http://localhost:${port}`);
});
