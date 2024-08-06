const express = require('express');
const multer = require('multer');
const cheerio = require('cheerio');
const axios = require('axios');
const FormData = require('form-data');
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

    let data = response.data;

    data = `
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 20px;
        font-size: 16px;
      }
      .problem-statement {
        border: 1px solid #ccc;
        padding: 20px;
        border-radius: 5px;
        background-color: #f9f9f9;
      }
      .header h1.title {
        color: #333;
        border-bottom: 2px solid #333;
        padding-bottom: 5px;
        font-size: 24px;
      }
      .header table {
        width: 100%;
        margin-bottom: 20px;
      }
      .header table td {
        padding: 5px;
      }
      .header table td.property-title {
        font-weight: bold;
        color: #555;
      }
      h2, h3 {
        color: #444;
        border-bottom: 1px solid #ddd;
        padding-bottom: 5px;
        font-size: 22px;
      }
      .input-specification, .output-specification {
        margin-bottom: 20px;
      }
      table.sample-tests {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 20px;
      }
      table.sample-tests th, table.sample-tests td {
        border: 1px solid #ccc;
        padding: 10px;
        text-align: left;
      }
      table.sample-tests th {
        background-color: #f2f2f2;
      }
      pre {
        background-color: #eee;
        padding: 10px;
        border-radius: 5px;
      }
    </style>
    ${data}
    `;

    res.send(data);
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
    formData.append('file', req.file.buffer, req.file.originalname); // Directly use the buffer and original name
    formData.append('problem', req.body.problem);
    
    const response = await axios.post(`${BASE_URL}/contests/${contestId}/submissions`, formData, {
      headers: {
        Authorization: `${TOKEN}`,
        ...formData.getHeaders()
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
