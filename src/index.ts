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

    const query = { id: req.body.id };
    const response = await collection.findOne(query);
    console.log(response);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }

  res.send('Welcome to Express & TypeScript Server');
});

app.post('/', async (req: Request, res: Response) => {
  try {
    const database = client.db('tech-manager');
    const collection = database.collection('tickets');

    const response = await collection.insertOne(req.body);
    console.log(response);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }

  res.send('Welcome to Express & TypeScript Server');
});

app.put('/', async (req: Request, res: Response) => {
  try {
    const database = client.db('tech-manager');
    const collection = database.collection('tickets');

    const query = { id: req.body.id };
    const response = await collection.updateOne(query, req.body);
    console.log(response);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }

  res.send('Welcome to Express & TypeScript Server');
});

app.delete('/', async (req: Request, res: Response) => {
  try {
    const database = client.db('tech-manager');
    const collection = database.collection('tickets');

    const query = { id: req.body.id };
    const response = await collection.deleteOne(query);
    console.log(response);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }

  res.send('Welcome to Express & TypeScript Server');
});

app.listen(port, () => {
  console.log(`Server is operational on http://localhost:${port}`);
});
