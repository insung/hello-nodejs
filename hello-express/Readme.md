express 에 대한 예제
===

## express 사용 방법

* local 저장소에 설치
  * npm install express
* global 저장소에 설치
  * npm install -g express

## package.json 을 사용한 설치 방법

* 아래 명령으로 package.json 생성 가능 (입력하는 항목은 default)
  * npm init
* package.json 에 express 항목을 자동으로 추가하는 방법
  * npm install express --save

## jade 사용 방법

* npm install jade --save
* 확장자를 .jade
* 간편한 markdown 형식의 html 사용 가능

## 소스 구성

* routing.js
  * hello-express 폴더에서 기본적으로 사용할 routing 및 routing 사용 방법 예제
* birds.js
  * express 모듈을 사용하여 간단한 router 의 개념을 알아보는 예제
* form.js
  * bodyparser 를 사용하여 request body 를 파싱하는 것을 알아보는 예제
* query-string.js
  * url 로 전송된 query string 의 topic id 에 해당하는 url 로 redirect 하는 예제
* sementic-url.js
  * 전달받은 query string 에 id 를 부여할 수 있는 것을 보여주는 예제