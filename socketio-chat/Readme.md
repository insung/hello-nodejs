socket.io 를 통한 random chat 예제
===

## [history] socket.io 를 통하여 chat 하는 방법을 구현

* 참고문서  
  [socket.io 기본](http://poiemaweb.com/nodejs-socketio)  
  [random 채팅](http://mudchobo.tistory.com/540)

* socket.io 를 통하여 간단하게 chat 하는 방법 [[commit history]](https://github.com/insung/hello-nodejs/commit/fc8c7d6839898ac3f52afa936e734aefa34dfb0c)
```javascript
io.on('connection', function(socket) {

    // 현재 접속되어 있는 클라이언트로부터의 메시지를 수신하기 위해서는 on 메소드를 사용한다.
    socket.on('event_name', function(data) {
    }

    // 접속된 모든 클라이언트에게 메시지를 전송한다.
    io.emit("event_name", msg);

    // 메시지를 전송한 클라이언트에게만 메시지를 전송한다.
    socket.emit('event_name', msg);

    // 메시지를 전송한 클라이언트를 제외한 모든 클라이언트에게 메시지를 전송한다.
    socket.broadcast.emit('event_name', msg);

    // 특정 클라이언트에게만 메시지를 전송한다.
    io.to(id).emit('event_name', data);
}
```
* socket.io namespace 사용법 [[commit history]](https://github.com/insung/hello-nodejs/commit/ac9b44c309a9498c0defb8049ac3f81e27035f46)
```javascript
// socket.io 에서 namespace를 지정하여 서로 다른 end point 를 할당할 수 있다.
// namespace를 특별히 지정하지 않은 경우 default namespace인 /를 사용하게 된다.

//// Server-side ////
var nsp = io.of('/my-namespace');
nsp.on('connection', function(socket){
  
});
nsp.emit('hi', 'everyone!');

//// Client-side ////
// 지정 namespace로 접속한다
var socket = io('/my-namespace');
```