import { getSocket } from "./sockets";

const messages = document.getElementById("jsMessages");
const sendMsg = document.getElementById("jsSendMsg");

const appendMsg = (text, nickname) => {
  console.log(`${nickname}: ${text}`);

  const li = document.createElement("li");
  li.innerHTML = `<span class="author ${nickname ? "out" : "self"}">${nickname ? nickname : "You"}:</span> ${text}`;
  messages.appendChild(li);
};

const handleSendMsg = (event) => {
  event.preventDefault();
  const input = sendMsg.querySelector("input");
  const { value } = input;

  getSocket().emit(window.events.sendMsg, { message: value });
  appendMsg(value);
  input.value = "";
};

export const handleNewMsg = ({ message, nickname }) => {
  return appendMsg(message, nickname);
};

if (sendMsg) {
  sendMsg.addEventListener("submit", handleSendMsg);
}
