// index.js는 클라이언트(프론트엔드), server.js는 서버(백엔드) 역할을 하는 중이다.
// io()함수는 socket.io.js파일로부터 Socket.IO에 의해 우리에게 주어지는 함수이다.
// io()함수는 클라이언트측 소켓과 서버측 소켓을 연결시켜주는 함수이다.
// io함수를 실행하고 기본 경로는 /로 설정한다.
// home.pug파일에서 script를 통해 http://localhost:4000/socket.io/socket.io.js 로부터 socket.io.js파일을 가져왔기 때문에 사용할 수 있다.
// (server.js에서 const io = socketIO(server)로 가져온 io가 아님!)
// 이 함수를 실행시켜줘야 비로소 index.js(클라이언트측 소켓)와 server.js(서버측 소켓)가 소켓 연결이 된다.
// 같은 서버라면 /로 연결하면 되고 다른 서버라면 /가 아닌 다른 서버로 연결시켜줘야 한다.
// io("/")함수의 실행결과인 socket변수는 클라이언트측 웹 소켓을 의미한다.

// eslint때문에 io를 못 불러와서 eslint에서 이 줄에서 동작하지 않도록 해지헀다.
// eslint-disable-next-line no-undef
const socket = io("/");

// 서버측 소켓(server.js)에서 socket.emit("hello")를 통해 hello라는 이벤트를 보냈고
// 이 이벤트를 받으려면 클라이언트측 소켓(index.js)에서 socket.on("hello")을 통해 해당 이벤트를 들어야 한다.
// socket.on("hello", () => console.log("I listened hello"));

// 마찬자기로 클라이언트측 웹 소켓으로도 emit()을 통해 서버측 웹 소켓에 이벤트를 전달할 수 있다.
// socket.emit("hello2");

const sendMessage2 = (message) => {
  console.log(`You: ${message}`);
  socket.emit("newMessage2", { message });
};

socket.on("messageNotify2", ({ message }) => {
  console.log(`Someone: ${message}`);
});

// sendMessage라는 함수를 만들고 이 함수는 파라미터로 message를 받아서 그 meesage값을 {message:message}를 통해 객체에 담아서 서버측 소켓에 보낸다.
const sendMessage = (message) => {
  console.log(`You: ${message}`);
  socket.emit("newMessage", { message: message });
};

const handleMessageNotify = (data) => {
  const { message, nickname } = data;
  console.log(`${nickname}: ${message}`);
};

// setNickname함수는 사용자로부터 nickname을 전달받아서 setNickname이벤트와 함께 nickname을 서버측 소켓에 전달해준다.
const setNickname = (nickname) => {
  socket.emit("setNickname", { nickname });
};

socket.on("messageNotify", handleMessageNotify);
