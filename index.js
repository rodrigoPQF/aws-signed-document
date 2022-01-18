import express from 'express';
import AWS from 'aws-sdk';
const s3 = new AWS.S3({
    credentials: {accessKeyId: 'COLOCA KEY AKI', secretAccessKey: 'COLOCA KEY AKI'},
  region: 'REGIAO AKI',
})
import { v4 as uuidv4 } from 'uuid';
import cors from 'cors';

const app = express();

app.use(cors());

app.get('/get-signed-url', async (req, res) => {

  await s3.createPresignedPost({
    
    
    Fields: {
      key: uuidv4(),

    },
    Conditions: [
      ["starts-with", "$Content-Type", "image/"],
      ["content-length-range", 0, 1000000],
    ],
    Expires: 30,
    Bucket: 'BUCKET AKI',
  }, (err, signed) => {
    console.log(`erroo`, err)
    res.json(signed);
  });
})

app.listen(8080);