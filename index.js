const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const db = require('./queries')
const port = 3000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/urls', db.getUrls)
app.get('/urls/:id', db.getUrlById)
app.post('/urls', db.addUrl)
// app.put('/urls/:id', db.updateUrl)
app.delete('/urls/:id', db.deleteUrl)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
