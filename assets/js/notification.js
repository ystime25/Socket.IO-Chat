const body = document.querySelector("body");

const alertNotification = (text, color) => {
  const notification = document.createElement("div");

  notification.innerHTML = text;
  notification.style.backgroundColor = color;
  notification.className = "notification";
  body.appendChild(notification);
};

export const handleNewUser = ({ nickname }) => {
  const text = `${nickname ? nickname : "NoName"} just joined`;
  const color = "dodgerblue";
  return alertNotification(text, color);
};

export const handleDisconnected = ({ nickname }) => {
  const text = `${nickname ? nickname : "NoName"} just lefted`;
  const color = "crimson";
  return alertNotification(text, color);
};
