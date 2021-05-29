import { initSockets } from "./sockets";

const body = document.querySelector("body");
const loginForm = document.getElementById("jsLogin");

const NICKNAME = "nickname";
const LOGGED_IN = "loggedIn";
const LOGGED_OUT = "loggedOut";

const nickname = localStorage.getItem(NICKNAME);

const logIn = (nickname) => {
  // eslint-disable-next-line no-undef
  const socket = io("/");
  socket.emit(window.events.setNickname, { nickname });
  initSockets(socket);
};

if (nickname === null) {
  body.className = LOGGED_OUT;
} else {
  body.className = LOGGED_IN;
  logIn(nickname);
}

const handleFormSubmit = (event) => {
  event.preventDefault();
  const input = loginForm.querySelector("input");
  localStorage.setItem(NICKNAME, input.value);
  body.className = LOGGED_IN;
  logIn(input.value);
  input.value = "";
};

if (loginForm) {
  loginForm.addEventListener("submit", handleFormSubmit);
}
