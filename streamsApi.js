import express, { json } from 'express';
import cors from 'cors'; // Import cors

const app = express();
const port = 3000;
app.use(cors());
app.use(json());

app.get('/stream', async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Transfer-Encoding', 'chunked');

  const bigData = Array.from({ length: 50000 }, (_, i) => ({
    id: i + 1,
    value: `Data ${i + 1}`,
    name: `Name ${i + 1}`,
    age: 20 + (i % 30), // Random age between 20 and 49
    location: `Location ${i + 1}`
  }));

  for (let i = 0; i < bigData.length; i += 500) {
    const chunk = bigData.slice(i, i + 500);
    res.write(JSON.stringify(chunk));
    await new Promise(r => setTimeout(r, 500)); // simulate delay
  }
  res.end();
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});