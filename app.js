// app.js (Render 최종 안정화 버전)
const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

// ─────────────────────────────
// 1️⃣ 기본 설정
// ─────────────────────────────
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// ─────────────────────────────
// 2️⃣ 라우팅 (페이지 경로)
// ─────────────────────────────
app.get('/', (req, res) => {
  res.send('홈 페이지입니다. /bu-eop 으로 이동해보세요.');
});

app.get('/bu-eop', (req, res) => {
  res.render('bu-eop'); // views/bu-eop.ejs 렌더링
});

// ─────────────────────────────
// 3️⃣ robots.txt 자동 제공
// ─────────────────────────────
app.get('/robots.txt', (req, res) => {
  res.type('text/plain');
  res.send(`User-agent: *
Allow: /
Sitemap: https://bu-eop-landing.onrender.com/sitemap.xml`);
});

// ─────────────────────────────
// 4️⃣ sitemap.xml 자동 생성
// ─────────────────────────────
app.get('/sitemap.xml', (req, res) => {
  res.type('application/xml');
  const baseUrl = 'https://bu-eop-landing.onrender.com';
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>${baseUrl}/</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
    </url>
    <url>
      <loc>${baseUrl}/bu-eop</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>1.0</priority>
    </url>
  </urlset>`;
  res.send(xml);
});

// ─────────────────────────────
// 5️⃣ Render용 포트 설정
// ─────────────────────────────
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server started successfully on port ${PORT}`);
  console.log(`🌐 Access the site at: https://bu-eop-landing.onrender.com`);
});

