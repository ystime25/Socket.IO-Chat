import express from "express";
import { join } from "path";
import socketIO from "socket.io";
import morgan from "morgan";
import socketController from "./socketController";
import events from "./event";

const app = express();
const PORT = 4000;

app.set("views", join(__dirname, "views"));
app.set("view engine", "pug");
app.use(morgan("dev"));
app.use(express.static(join(__dirname, "static")));
app.get("/", (req, res) => {
  res.render("home", { events: JSON.stringify(events) });
});

const handleListening = (req, res) => {
  console.log(`😀 Server running: http://localhost:${PORT}`);
};

const server = app.listen(PORT, handleListening);
const io = socketIO(server);

io.on("connection", (socket) => {
  socketController(socket);
});
