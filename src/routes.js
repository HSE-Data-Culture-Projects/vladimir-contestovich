const express = require('express');
const logger = require('./logger');
const multer = require('multer');
const app = express();
const upload = multer();


const {
  getProblems,
  getProblemStatement,
  getFullSubmissionReport,
  submitSolution,
  getCompilers
} = require('./controllers');

const router = express.Router();

router.get('/contests/:contestId/problems', getProblems);
logger.info('Маршрут problems');

router.get('/contests/:contestId/problems/:problemId/statement', getProblemStatement);
logger.info('Маршрут problem statement');

router.get('/contests/:contestId/submissions/:submissionId/full', getFullSubmissionReport);
logger.info('Маршрут full submission report');

router.post('/contests/:contestId/submissions', upload.single('file'), submitSolution);
logger.info('Маршрут submit solution');

router.get('/compilers', getCompilers);
logger.info('Маршрут compilers');

module.exports = router;
