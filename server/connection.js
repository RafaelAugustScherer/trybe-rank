import { MongoClient } from 'mongodb';
import fs from 'fs';


const readTextFile = (file) => {
    const data = fs.readFileSync('./dbPassword.txt', 'utf8');
    return data.toString();
}

const connect = async () => {
  const uri =
    `mongodb+srv://admin:${readTextFile('./dbPassword.txt')}@cluster0.gfw2a.mongodb.net/test?retryWrites=true&w=majority`;
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  
  await client.connect();

  const database = client.db('trybeRank');
  
  const usersCollection = database.collection('users');
  const questionsCollection = database.collection('questions');
  const typesCollection = database.collection('types');
  
  return { database, client, usersCollection, questionsCollection, typesCollection };
}

export default connect;
