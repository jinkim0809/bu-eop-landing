// generate_sitemap.js
const fs = require('fs');

const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
const pages = [
  '/',            // 루트(리다이렉트되어 랜딩으로 가게됨)
  '/bu-eop'
];

const now = new Date().toISOString();

let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

pages.forEach(p => {
  xml += '  <url>\n';
  xml += `    <loc>${baseUrl.replace(/\/$/, '')}${p}</loc>\n`;
  xml += `    <lastmod>${now}</lastmod>\n`;
  xml += '    <changefreq>weekly</changefreq>\n';
  xml += '    <priority>0.8</priority>\n';
  xml += '  </url>\n';
});

xml += '</urlset>\n';

fs.writeFileSync('public/sitemap.xml', xml, 'utf8');
console.log('public/sitemap.xml 생성됨');
