session 에 대한 예제
===

## 전체 설명

* express-session 과 session-file-store 을 사용하여 session 을 사용할 수 있음
* session-file-store 는 파일에 직접 session 에 대한 정보를 저장할 수 있음

## index.js 소스 해설

* '/count' url 로 접속 시, session.count 가 증가함
* '/auth/login' 접속하면, username 과 password 를 입력하여 '/auth/login' 으로 post 전송함  
전달받은 username 을 세션 displayName 객체에 저장하여 '/auth/welcome' 으로 redirect 하여 출력하는 예제
* '/auth/logout' 으로 접속하면 세션의 displayName 객체를 delete 함