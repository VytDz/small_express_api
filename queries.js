const Pool = require('pg').Pool;
const credentials = require('./config.json');

const pool = new Pool(credentials);

const getUrls = (request, response) => {
  pool.query('SELECT * FROM urls ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error;
    }
    console.log('abc', response);
    response.status(200).json(results.rows);
  });
};

const getUrlById = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query('SELECT * FROM urls WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const addUrl = (request, response) => {
  const { source, url, time_first_scraped, time_last_scraped } = request.body;

  pool.query(
    'INSERT INTO users (source, url, timestamp) VALUES ($1, $2, $3, $4)',
    [source, url, time_first_scraped, time_last_scraped],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`User added with ID: ${result.insertId}`);
    }
  );
};

const deleteUrl = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query('DELETE FROM urls WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`Url deleted with ID: ${id}`);
  });
};

module.exports = {
  getUrls,
  getUrlById,
  addUrl,
  deleteUrl,
};
