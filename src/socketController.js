import events from "./event";

const socketController = (socket) => {
  socket.on(events.setNickname, ({ nickname }) => {
    socket.nickname = nickname;
    socket.broadcast.emit(events.newUser, { nickname });
  });

  socket.on(events.disconnect, () => {
    socket.broadcast.emit(events.disconnected, { nickname: socket.nickname });
  });

  socket.on(events.sendMsg, ({ message }) => {
    socket.broadcast.emit(events.newMsg, {
      message,
      nickname: socket.nickname,
    });
  });
};

export default socketController;
