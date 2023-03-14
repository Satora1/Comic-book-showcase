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

app.get('/heroes', async (req, res) => {
  const response = await fetch('https://gateway.marvel.com/v1/public/characters?apikey=1c4a632e0b889700b428b83563a3f86c&hash=6adf6ccdedcc9751f401b467a0b9bbfd&ts=1678713362&orderBy=modified&limit=100');
  const data = await response.json();
  res.json(data.data.results)
})

app.get('/comics', async (req, res) => {
  const response = await fetch('https://gateway.marvel.com/v1/public/comics?apikey=1c4a632e0b889700b428b83563a3f86c&hash=6adf6ccdedcc9751f401b467a0b9bbfd&ts=1678713362&orderBy=modified&limit=100');
  const data = await response.json();
  res.json(data.data.results)
})