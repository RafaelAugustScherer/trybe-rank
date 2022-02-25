import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();


const connect = async () => {
  const uri =
    `mongodb+srv://admin:${process.env.DB_PASSWORD}@cluster0.gfw2a.mongodb.net/test?retryWrites=true&w=majority`;
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  
  await client.connect();

  const database = client.db('trybeRank');
  
  const usersCollection = database.collection('users');
  const questionsCollection = database.collection('questions');
  const typesCollection = database.collection('types');
  
  return { database, client, usersCollection, questionsCollection, typesCollection };
}

export default connect;
