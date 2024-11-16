const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require ('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
app.use(cors());
app.use(express.json());




const uri = `mongodb+srv://${process.env.USER_ID}:${process.env.USER_PASS}@users.pn2ul.mongodb.net/?retryWrites=true&w=majority&appName=Users`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    

    await client.connect();
    // Send a ping to confirm a successful connection
    
    console.log("Server successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);




app.get('/',(req,res)=>{
    res.send('Server is Connected')
})

// ============== post api =========//
// app.post('/user',async(req,res)=>{
//     const user = req.body;
//     const result = await 
// })



app.listen(port,()=>[
    console.log(`Server is Running on port ${port}`)
])

