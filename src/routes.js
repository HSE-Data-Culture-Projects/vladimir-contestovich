const express = require('express');
const {
  getProblems,
  getProblemStatement,
  getFullSubmissionReport,
  submitSolution,
  getCompilers
} = require('./controllers');

const router = express.Router();

router.get('/contests/:contestId/problems', getProblems);
router.get('/contests/:contestId/problems/:problemId/statement', getProblemStatement);
router.get('/contests/:contestId/submissions/:submissionId/full', getFullSubmissionReport);
router.post('/contests/:contestId/submissions', submitSolution);
router.get('/compilers', getCompilers);

module.exports = router;
