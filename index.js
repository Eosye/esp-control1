const express = require("express");
const app = express();

app.use(express.json());

let state = {
  led: false,
  buzzer: false
};

app.get("/api/state", (req, res) => {
  res.json(state);
});

app.post("/api/led", (req, res) => {
  state.led = req.body.state;
  res.json(state);
});

app.post("/api/buzzer", (req, res) => {
  state.buzzer = req.body.state;
  res.json(state);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server started on port", PORT);
});
