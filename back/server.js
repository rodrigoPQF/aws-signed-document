import express from 'express'
import { generateUploadURL } from './s3.js'

const app = express()

app.use(express.static('front'))

app.get('/s3Url', async (req, res) => {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Headers', "*");
  const url = await generateUploadURL()
  res.send({url})
})

app.listen(8080, () => console.log("listening on port 8080"))