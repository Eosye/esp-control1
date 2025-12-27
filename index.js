const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public')); // для index.html

// Состояние устройств
let devices = {
  led: false,
  buzzer: false
};

// API для ESP и фронтенда
app.get('/api/devices', (req, res) => {
  res.json(devices);
});

app.patch('/api/devices/:device', (req, res) => {
  const device = req.params.device;
  if (devices.hasOwnProperty(device)) {
    devices[device] = req.body.state;
    res.json({ success: true, device: device, state: devices[device] });
  } else {
    res.status(404).json({ error: 'Device not found' });
  }
});

app.listen(port, () => console.log(`Server running on port ${port}`));
