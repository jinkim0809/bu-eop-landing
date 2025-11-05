## 개요

이 저장소는 단일 Express 서버로 제공되는 간단한 랜딩 페이지입니다. AI 에이전트는 아래 핵심 패턴과 파일을 참고하여 변경, 배포 준비, 콘텐츠 수정, 또는 사이트 메타데이터 업데이트 작업을 수행해야 합니다.

## 주요 구성 및 이유

- `app.js` — Express(뷰 엔진: EJS)로 라우트 `/bu-eop`을 렌더링. 루트(`/`)는 `/bu-eop`로 리디렉트합니다. 단일 프로세스, 서버사이드 렌더링 방식.
- `views/landing.ejs` — 템플릿: `title`, `description`, `url`, `kakaoLink`, `published` 변수를 받습니다. SEO용 meta/OG, 구조화 데이터(JSON-LD)가 포함되어 있음.
- `public/` — 정적 파일(이미지, CSS, `robots.txt`, `sitemap.xml`)이 위치합니다.
- `generate_sitemap.js` — 페이지 목록에서 `public/sitemap.xml`을 생성합니다. BASE_URL 환경변수를 사용해 배포 환경의 도메인을 넣습니다.

## 실행 / 개발 워크플로 (명확한 명령)

- 로컬 실행: `npm start` (scripts.start → `node app.js`)  
- 사이트 생성(사이트맵): `BASE_URL=http://your-domain.com node generate_sitemap.js`  
  - (Windows PowerShell) ` $env:BASE_URL='https://your-domain.com'; node generate_sitemap.js`  
- 환경변수 설명:  
  - `LANDING_URL` — 템플릿의 canonical/og:url에 사용 (기본: `http://localhost:3000/bu-eop`).  
  - `KAKAO_LINK` — 오픈채팅 링크 (기본: 설정된 kakao 링크).  
  - `BASE_URL` — `generate_sitemap.js`에서 sitemap의 loc 생성에 사용.

## 코드/템플릿 패턴 (구체적 예시)

- `landing.ejs`는 서버에서 전달한 값으로 메타와 구조화데이터를 채워 SEO를 처리합니다. 예: `<%= title %>`, `<%= description %>`, `<%= url %>`.
- 새로운 페이지를 추가하려면: 1) `generate_sitemap.js`의 `pages` 배열에 경로 추가, 2) 필요 시 `views/`에 템플릿 추가, 3) `node generate_sitemap.js`로 sitemap 갱신.

## 배포/운영에서 주의할 점

- `public/robots.txt`와 `public/sitemap.xml`의 도메인(Host/loc)은 배포 전에 `BASE_URL`과 `LANDING_URL`에 맞춰 업데이트해야 합니다.
- `package.json`의 `start` 스크립트만 정의되어 있으므로, 프로덕션에서 서비스 매니저(systemd, PM2 등)를 사용해 프로세스 관리 필요.

## 변경 예시(간단한 요청 처리 흐름)

- 콘텐츠 수정: `views/landing.ejs`에서 텍스트 변경 → (선택) `generate_sitemap.js`로 sitemap 갱신 → 커밋/배포.  
- 새로운 메타 필드 추가: `app.js`에서 렌더 시 추가 키/값을 전달하고 `landing.ejs`에서 해당 값을 사용.

## 어디서 찾을지 (파일 레퍼런스)

- 서버 진입점: `app.js`  
- 템플릿: `views/landing.ejs`  
- 정적: `public/robots.txt`, `public/sitemap.xml`  
- 사이트맵 생성: `generate_sitemap.js`  
- 실행: `package.json` (scripts.start)

피드백: 이 파일에서 더 자세히 원하시는 워크플로(예: 테스트, CI, 배포 스크립트)를 알려주시면 해당 섹션을 확장하겠습니다.
