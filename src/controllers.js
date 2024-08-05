const express = require('express');
const multer = require('multer');
const axios = require('axios');
const logger = require('./logger');
const app = express();
const upload = multer();

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
    logger.info('Получаем полный отчет по отправке');
    const response = await axios.get(`${BASE_URL}/contests/${contestId}/submissions/${submissionId}/full`, {
      headers: {
        Authorization: `${TOKEN}`
      }
    });
    res.json(response.data);
    logger.info('Полный отчет по отправке успешно получен');
  } catch (error) {
    logger.error('Ошибка при получении полного отчета по отправке', error);
    res.status(error.response ? error.response.status : 500).json({ error: error.message });
  }
};

const submitSolution = async (req, res) => {
  const { contestId } = req.params;
  try {
    logger.info('Отправлено решение');
    const formData = new FormData();
    formData.append('compiler', req.body.compiler);
    const fileBlob = new Blob([req.file.buffer], { type: req.file.mimetype });
    formData.append('file', fileBlob, req.file.originalname);
    formData.append('problem', req.body.problem);

    const response = await axios.post(`${BASE_URL}/contests/${contestId}/submissions`, formData, {
      headers: {
        Authorization: `${TOKEN}`,
        'Content-Type': 'multipart/form-data'
      }
    });

    const runId = response.data.runId;

    logger.info(`Получен индентификатор посылки: ${runId}. Ожидание проверки.`);

    const getFullReport = async () => {
      const fullReportResponse = await axios.get(`${BASE_URL}/contests/${contestId}/submissions/${runId}/full`, {
        headers: {
          Authorization: `${TOKEN}`
        }
      });
      if (fullReportResponse.data.status === 'WAITING') {
        logger.info(`Посылка ещё проверяется...`);
        setTimeout(getFullReport, 3000);
      } else {
        logger.info(`Посылка проверена! Статус: ${fullReportResponse.data.status}`);
        res.json(fullReportResponse.data);
      }
    };
    getFullReport();
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
