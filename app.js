// app.js
const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;

// 뷰 엔진 설정
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// 실제 운영시에는 예: https://your-domain.com/bu-eop 로 바꿔주세요
const LANDING_URL = process.env.LANDING_URL || 'http://localhost:3000/bu-eop';
const KAKAO_LINK = process.env.KAKAO_LINK || 'https://open.kakao.com/o/ghEwnw0h';

app.get('/bu-eop', (req, res) => {
  res.render('landing', {
    title: '부업 - 실전 가이드 및 오픈채팅',
    description: '부업 초보자를 위한 실전 가이드와 실시간 상담 오픈채팅. 무료 정보/사례/문의 안내.',
    url: LANDING_URL,
    kakaoLink: KAKAO_LINK,
    published: new Date().toISOString()
  });
});

// 간단한 홈 리디렉트(루트 접속 시 랜딩으로)
app.get('/', (req, res) => res.redirect('/bu-eop'));

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
