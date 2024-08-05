const axios = require('axios');
const logger = require('./logger');

const BASE_URL = 'https://api.contest.yandex.net/api/public/v2';
const { TOKEN } = require('./config');

const getProblems = async (req, res) => {
  const { contestId } = req.params;
  try {
    logger.info('Получены проблемы');
    const response = await axios.get(`${BASE_URL}/contests/${contestId}/problems`, {
      headers: {
        Authorization: `${TOKEN}`
      }
    });
    res.json(response.data);
  } catch (error) {
    logger.error('Ошибка при получении проблем', error);
    res.status(error.response ? error.response.status : 500).json({ error: error.message });
  }
};

const getProblemStatement = async (req, res) => {
  const { contestId, problemId } = req.params;
  try {
    logger.info('Получено описание проблемы');
    const response = await axios.get(`${BASE_URL}/contests/${contestId}/problems/${problemId}/statement`, {
      headers: {
        Authorization: `${TOKEN}`
      }
    });
    res.json(response.data);
  } catch (error) {
    logger.error('Ошибка при получении описания проблемы', error);
    res.status(error.response ? error.response.status : 500).json({ error: error.message });
  }
};

const getFullSubmissionReport = async (req, res) => {
  const { contestId, submissionId } = req.params;
  try {
    logger.info('Получен полный отчет по отправке');
    const response = await axios.get(`${BASE_URL}/contests/${contestId}/submissions/${submissionId}/full`, {
      headers: {
        Authorization: `${TOKEN}`
      }
    });
    res.json(response.data);
  } catch (error) {
    logger.error('Ошибка при получении полного отчета по отправке', error);
    res.status(error.response ? error.response.status : 500).json({ error: error.message });
  }
};

const submitSolution = async (req, res) => {
  const { contestId } = req.params;
  try {
    logger.info('Отправлено решение');
    const response = await axios.post(`${BASE_URL}/contests/${contestId}/submissions`, req.body, {
      headers: {
        Authorization: `${TOKEN}`
      }
    });
    res.json(response.data);
  } catch (error) {
    logger.error('Ошибка при отправке решения', error);
    res.status(error.response ? error.response.status : 500).json({ error: error.message });
  }
};

const getCompilers = async (req, res) => {
  try {
    logger.info('Получены компиляторы');
    const response = await axios.get(`${BASE_URL}/compilers`, {
      headers: {
        Authorization: `${TOKEN}`
      }
    });
    res.json(response.data);
  } catch (error) {
    logger.error('Ошибка при получении компиляторов', error);
    res.status(error.response ? error.response.status : 500).json({ error: error.message });
  }
};

module.exports = {
  getProblems,
  getProblemStatement,
  getFullSubmissionReport,
  submitSolution,
  getCompilers
};
