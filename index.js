const express = require('express');
const cors = require('cors');
const fileMiddleware = require('express-multipart-file-parser');
const http = require('http');
const app = express();
app.use(express.json({limit: '200mb'}));



const corsOpts = {
  // origin: [
  //   'capacitor://localhost',
  //   'ionic://localhost',
  //   'http://localhost',
  //   'http://localhost:8080',
  //   'http://localhost:8100',
  //   'https://cutdown.in/splitter/',
  //   'http://161.35.6.154/',
  //   '*',
  // ],
  origin: '*',
  
    methods: [
      'GET',
      'POST',
    ],
  
    allowedHeaders: [
      'Content-Type',
    ],
  };
  
app.use(cors(corsOpts));
  
app.use(fileMiddleware);

require('dotenv').config({ path: __dirname + '/.env' });


// Logger
if (process.env.ENV === "DEV") {
    // console.log("Will Start Logging");
    const logger = require('morgan');
    app.use(logger('dev'));
}

app.use(express.static('./downloads'));

const ytdlControllers = require('./src/controllers/ytdl.controller');
app.use(ytdlControllers)

// const port = process.env.PORT;
const port = 8000;

const hostname = '0.0.0.0';
// const hostname = '127.0.0.1'


// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('NodeJS server running on Shared Hosting\n');
// });

// server.listen(port, hostname, () => {
//   console.log('Server running at http://'+hostname+':'+port+'/');
// });

const server = app.listen(port, () => {
    console.log(`listening on port ${port}`);
})

server.timeout = 600000;