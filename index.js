const express = require("express");
const app = express();
app.use(express.json());

let ledState = false;
let buzzerState = false;

// Главная страница с кнопками
app.get("/", (req, res) => {
  res.send(`
    <h2>ESP8266 Control</h2>
    <button onclick="fetch('/api/devices/led',{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({state:true})})">LED ON</button>
    <button onclick="fetch('/api/devices/led',{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({state:false})})">LED OFF</button>
    <br><br>
    <button onclick="fetch('/api/devices/buzzer',{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({state:true})})">Buzzer ON</button>
    <button onclick="fetch('/api/devices/buzzer',{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({state:false})})">Buzzer OFF</button>
  `);
});

// API для ESP
app.get("/api/devices", (req,res) => {
  res.json({led: ledState, buzzer: buzzerState});
});

app.patch("/api/devices/led", (req,res) => {
  ledState = req.body.state;
  console.log("LED:", ledState);
  res.send("OK");
});

app.patch("/api/devices/buzzer", (req,res) => {
  buzzerState = req.body.state;
  console.log("Buzzer:", buzzerState);
  res.send("OK");
});

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
