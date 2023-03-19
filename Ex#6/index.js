const express = require('express');
const cors = require('cors')

const app = express();
const port = 3200;

app.use(cors())

app.get('/api', (req, res) => res.json({data: 'tes 1 2 3'}));

app.listen(port, () => console.log(`Server run on http://localhost:${port}`));