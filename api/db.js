import pg from 'pg'
const { Pool } = pg;

export const db = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'david-hermann-react-blog',
    password: 'wD8sGZR#OqVgfg^LiQ^XdTW7$skpP*Q8mzW',
    port: 5432,
    //max: 20,
    //idleTimeoutMillis: 30000,
    //connectionTimeoutMillis: 2000,
});

export const queryDB = (query, values) => {
    try {
        db.query(query, values)
    } catch(err) {
        console.log("connection unsuccessful")
        console.log(err)
    }
}

import { MongoClient, ServerApiVersion } from 'mongodb'
const uri = "mongodb+srv://atlas-user-1:@david-hermann-atlas.a4papbn.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
  async function run() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  run().catch(console.dir);