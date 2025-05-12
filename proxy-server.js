const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const app = express();
const PORT = 3001;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/kakao-thumbnail', async (req, res) => {
  const { placeId } = req.query;
  if (!placeId) return res.status(400).json({ error: 'placeId required' });
  try {
    const url = `https://place.map.kakao.com/${placeId}`;
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const ogImage = $('meta[property="og:image"]').attr('content');
    if (ogImage) {
      res.json({ thumbnail: ogImage });
    } else {
      res.status(404).json({ error: 'No thumbnail found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch thumbnail' });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});