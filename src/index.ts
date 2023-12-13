import express, { Request, Response, Application } from 'express';
import dotenv from 'dotenv';

//For env File
dotenv.config();

var admin = require('firebase-admin');

var serviceAccount = require('../qa-skyrave.io-service-account-key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const app: Application = express();
const port = process.env.PORT || 8000;

const db = admin.firestore();
let collection = db.collection('tickets');

app.get('/', async (req: Request, res: Response) => {
  try {
    const response = await collection.get();
    const formattedResponse = response.docs.map((element: any) =>
      element.data()
    );
    return res.json({ status: 200, response: formattedResponse });
  } catch (e) {
    throw e;
  }
});

app.post('/', async (req: Request, res: Response) => {
  try {
    const newDocumentRef = collection(collection).doc();

    // Set the data for the new document
    const response = await newDocumentRef.set(req.body);
    return res.json({ status: 200, response });
  } catch (e) {
    throw e;
  }
});

app.put('/', async (req: Request, res: Response) => {
  try {
    let document = collection.doc(req.body.docID);
    // Perform the update
    const response = document.update(req.body);
    return res.json({ status: 200, response });
  } catch (e) {
    throw e;
  }
});

app.delete('/', async (req: Request, res: Response) => {
  try {
    let document = collection.doc(req.body.id);

    const response = await document.delete();
    return res.json({ status: 200, response });
  } catch (e) {
    throw e;
  }
});

app.listen(port, () => {
  console.log(` Server is operational on http://localhost:${port} `);
});
