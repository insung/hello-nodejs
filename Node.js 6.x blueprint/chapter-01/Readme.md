기초 구축
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