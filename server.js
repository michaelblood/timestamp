const express = require('express');

const app = express();

const PORT = Number(process.argv[2]) || 3000;
const months = ['January', 'February', 'March', 'April',
                'May', 'June', 'July', 'August',
                'September', 'October', 'November', 'December'];

const getUnix = (date) => Date.parse(date);
const getNatural = (date) => {
  const d = date.getDate()
  const m = months[date.getMonth()];
  const y = date.getFullYear();

  return `${m} ${d}, ${y}`;
};

app.get('/', (req, res) => {
  res.end('Timestamp');
});

app.get('/:datestring', (req, res) => {
  try {
    let datestring = req.params.datestring;
    let date = new Date(datestring);
    if (date.getDate() != date.getDate()) {
      date = new Date(Number(datestring));
    }
    if (date.getDate() != date.getDate()) {
      res.end(JSON.stringify({unix: null, natural: null}));
      return;
    }
    let out = {
      unix: getUnix(date),
      natural: getNatural(date)
    };

    res.end(JSON.stringify(out));
  } catch (e) {
    console.log(e);
    res.writeHead(500);
    res.end(e.toString());
    process.exit(1);
  }
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});