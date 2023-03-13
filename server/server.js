const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors');
const app = express();
app.use(cors())
app.use(express.json());

mongoose.connect("mongodb+srv://Marvel:kFIeUvSp0ZrKEUgZ@marvel.4akmwcm.mongodb.net/test")
  .then(() => {
    app.listen(5000, () => console.log('Server set http://localhost:5000'));
  })
