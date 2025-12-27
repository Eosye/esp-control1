const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// состояния устройств
let ledState = false;    // D2
let buzzerState = false; // D1

// Получить текущее состояние
app.get("/api/devices", (req, res) => {
  res.json({
    led: ledState,
    buzzer: buzzerState
  });
});

// Светодиод
app.get("/api/devices/led", (req, res) => {
  res.send(ledState ? "ON" : "OFF");
});

app.patch("/api/devices/led", (req, res) => {
  if (typeof req.body.state === "boolean") {
    ledState = req.body.state;
    res.send("OK");
  } else {
    res.status(400).send("Bad request");
  }
});

// Спикер
app.get("/api/devices/buzzer", (req, res) => {
  res.send(buzzerState ? "ON" : "OFF");
});

app.patch("/api/devices/buzzer", (req, res) => {
  if (typeof req.body.state === "boolean") {
    buzzerState = req.body.state;
    res.send("OK");
  } else {
    res.status(400).send("Bad request");
  }
});

// Статический фронтенд (если есть)
app.use(express.static("public"));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
