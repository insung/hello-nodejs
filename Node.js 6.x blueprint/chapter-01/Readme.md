chapter-01
===

* 목표  
  * Angular.js, Ember.js 과 같은 프레임워크 없이 express.js 만으로 구축
  * middleware 자원을 이용하여 MVC 디자인 패턴을 따르는 어플리케이션 제작
  * cookie-parser, body-parser 등의 미들웨어 사용

* 신규 프로젝트 생성
  * express --ejs --css sass --git  
    * --ejs : jade 대신 ejs 엔진 사용
    * --css sass : css 대신 sass 사용
    * --git : .gitignore 추가
  * npm install 을 통해 dependency 설치

* 어플리케이션 실행  
  * npm start  
    * 브라우져에서 http://localhost:3000 으로 접속

* 어플리케이션 MVC 패턴으로 수정  
  * server 폴더 생성
  * server 폴더 안에 config, routes, views 폴더 생성
  * chapter-01/views ejs 파일을 chapter-01/server/views 로 옮김
  * chapter-01/routes js 파일을 chapter-01/server/routes 로 옮김
  * chapter-01/app.js 수정
  * chatper-01/server/routes/index.js 수정
  * npm start 로 페이지 출력

* 기본 behavior 수정하고 어플리케이션 시작 (p27~28)
  * app.js 수정
  * package.json 수정 


* partial 파일 이용해 views 폴더 재편 (<% include %> 태그 사용)
  * views 폴더 안에 pages 폴더 생성
  * views 폴더 안에 partials 폴더 생성
  * views 안에 있는 파일들을 pages 로 이동
  * partials 안에 stylesheet.ejs 파일 생성 및 수정 (p29~30)
  * partials 안에 javascript.ejs 파일 생성 및 수정
  * partials 안에 header.ejs 파일 생성 및 수정
  * partials 안에 footer.ejs 파일 생성 및 수정
  * app.js 수정 (p31)
  * views/pages/index.ejs 수정
  * views/pages/error.ejs 수정

* 로그인, 가입 템플릿 추가
  * login.ejs 추가
  * signup.ejs 추가
  * profile.ejs 추가
  * 추가 middleware 설치
    * npm install connect-flash connect-mongo mongoose express-session gravatar bcrypt-nodejs passport passport-local --save
  * app.js 파일 리팩터링
  * config 와 passport 파일 추가
  * server/models 폴더 만들고 user 스키마 추가
  * route 추가 설정
  * server/controllers 폴더 생성 및 comments controller 추가