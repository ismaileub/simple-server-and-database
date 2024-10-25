const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection URI
const uri = "mongodb+srv://ismail301515:kFKzHUi10mwi07wT@cluster0.0c9fo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create MongoDB client
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
    const database = client.db("usersDB");
    const userCollection = database.collection("user");

    // GET all users
    app.get('/users', async (req, res) => {
      try {
        const cursor = userCollection.find();
        const users = await cursor.toArray();
        res.json(users);
      } catch (error) {
        res.status(500).json({ error: 'Error retrieving users' });
      }
    });

    // GET a single user by ID
    app.get('/users/:id', async (req, res) => {
      try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const user = await userCollection.findOne(query);
        res.json(user);
        // res.send(user);
      } catch (error) {
        res.status(500).json({ error: 'Error retrieving user' });
      }
    });

    // POST a new user
    app.post('/users', async (req, res) => {
      try {
        const user = req.body;
        const result = await userCollection.insertOne(user);
        res.status(201).json(result);
        // res.send(result);
      } catch (error) {
        res.status(500).json({ error: 'Error inserting user' });
      }
    });

    // DELETE a user by ID
    app.delete('/users/:id', async (req, res) => {
      try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await userCollection.deleteOne(query);
        res.json(result);
        //res.send(result);
      } catch (error) {
        res.status(500).json({ error: 'Error deleting user' });
      }
    });

    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. Successfully connected to MongoDB!");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
  }
}

run().catch(console.dir);

// Root route
app.get('/', (req, res) => {
  res.send('Simple CRUD is running');
});

// Start the server
app.listen(port, () => {
  console.log(`Simple CRUD is running on port: ${port}`);
});
