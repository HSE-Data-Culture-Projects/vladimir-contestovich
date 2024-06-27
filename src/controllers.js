const axios = require('axios');

const BASE_URL = 'https://api.contest.yandex.net/api/public/v2';
const TOKEN = process.env.TOKEN;

const getProblems = async (req, res) => {
  const { contestId } = req.params;
  try {
    const response = await axios.get(`${BASE_URL}/contests/${contestId}/problems`, {
      headers: {
        Authorization: `OAuth ${TOKEN}`
      }
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response ? error.response.status : 500).json({ error: error.message });
  }
};

const getProblemStatement = async (req, res) => {
  const { contestId, problemId } = req.params;
  try {
    const response = await axios.get(`${BASE_URL}/contests/${contestId}/problems/${problemId}/statement`, {
      headers: {
        Authorization: `OAuth ${TOKEN}`
      }
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response ? error.response.status : 500).json({ error: error.message });
  }
};

const getFullSubmissionReport = async (req, res) => {
  const { contestId, submissionId } = req.params;
  try {
    const response = await axios.get(`${BASE_URL}/contests/${contestId}/submissions/${submissionId}/full`, {
      headers: {
        Authorization: `OAuth ${TOKEN}`
      }
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response ? error.response.status : 500).json({ error: error.message });
  }
};

const submitSolution = async (req, res) => {
  const { contestId } = req.params;
  try {
    const response = await axios.post(`${BASE_URL}/contests/${contestId}/submissions`, req.body, {
      headers: {
        Authorization: `OAuth ${TOKEN}`
      }
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response ? error.response.status : 500).json({ error: error.message });
  }
};

const getCompilers = async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/compilers`, {
      headers: {
        Authorization: `OAuth ${TOKEN}`
      }
    });
    res.json(response.data);
  } catch (error) {
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
