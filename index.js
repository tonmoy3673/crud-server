const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.USER_ID}:${process.env.USER_PASS}@users.pn2ul.mongodb.net/?retryWrites=true&w=majority&appName=Users`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();

    // ============= data base =========//
    const usersCollection = client.db('userDB').collection('users')


    // ============== post api =========//
    app.post('/users',async(req,res)=>{
       const cursor = req.body;
       const result = await usersCollection.insertOne(cursor);
       res.send(result);
    });

    // =============== get all users api =============//
    app.get('/users',async(req,res)=>{
       const cursor = usersCollection.find();
       const result = await cursor.toArray();
       res.send(result);
    })

    // ============ user details api ==========//
    app.get('/users/:id',async(req,res)=>{
      const id = req.params.id;
      const query = {_id : new ObjectId(id)};
      const result = await usersCollection.findOne(query);
      res.send(result);
    })



 console.log("Server successfully connected to MongoDB!");
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Server is Connected");
});

app.listen(port, () => [console.log(`Server is Running on port ${port}`)]);
