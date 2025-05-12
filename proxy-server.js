// server.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const NAVER_CLIENT_ID = 'leCMobRcdcA1wDNnkoTd';
const NAVER_CLIENT_SECRET = 'VcfuHxfxly';

app.use(cors());

app.get('/naver-blog', async (req, res) => {
  const query = req.query.query;
  try {
    const result = await axios.get('https://openapi.naver.com/v1/search/blog.json', {
      params: { query, display: 5, sort: 'sim' },
      headers: {
        'X-Naver-Client-Id': NAVER_CLIENT_ID,
        'X-Naver-Client-Secret': NAVER_CLIENT_SECRET
      }
    });
    res.json(result.data);
  } catch (e) {
    res.status(500).json({ error: '네이버 API 호출 실패' });
  }
});
app.listen(3002, () => console.log('프록시 서버 3002번 포트 실행'));