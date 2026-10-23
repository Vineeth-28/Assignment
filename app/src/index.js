import 'dotenv/config';
import express from 'express';
import requestIp from 'request-ip';

const PORT = process.env.PORT || 3000;
const app = express();

app.use(requestIp.mw());

app.get('/', (req, res) => {
  const ip = req.clientIp;
  console.log(`Incoming request from IP: ${ip}`);
  res.send(`Your IP is ${ip}`);
});

// ALB uses this endpoint to check application health
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
