import express, { Express, Request, Response, Application } from 'express';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

//For env File
dotenv.config();

const client = new MongoClient(process.env.DB_URI as string);

const app: Application = express();
const port = process.env.PORT || 8000;

app.get('/', async (req: Request, res: Response) => {
  try {
    const database = client.db('tech-manager');
    const collection = database.collection('tickets');

    const query = { name: 'starting' };
    const ticket = await collection.findOne(query);
    console.log(ticket);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }

  res.send('Welcome to Express & TypeScript Server');
});
app.post('/');

app.listen(port, () => {
  console.log(`Server is operational on http://localhost:${port}`);
});
