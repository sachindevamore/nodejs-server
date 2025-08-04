import express, { json } from 'express';
import cors from 'cors'; // Import cors
import redis from 'redis'; // Import redis

const app = express();
const port = 3000;
app.use(cors());
app.use(json());


const client = redis.createClient({
  url: 'redis://redis:6379'
});

client.connect().catch(console.error);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

app.get('/', async (req, res) => {
  let count = await client.incr('counter');
  console.log('visitor count:', count); // Testing commit
  res.send(`Visitor count: ${count}`);
});

app.get('/message', (req, res) => {
  console.log('Received a request mount Working');
  res.json({ message: 'Hello, World! Mounting Sucess' });
});
