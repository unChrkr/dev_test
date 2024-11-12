import 'reflect-metadata';
import express from 'express';
import { DataSource } from 'typeorm';
import { User } from './entity/User';
import { Post } from './entity/Post';

const app = express();
app.use(express.json());

const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST || "localhost",
  port: 3306,
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "password",
  database: process.env.DB_NAME || "test_db",
  entities: [User,Post],
  synchronize: true,
});

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const initializeDatabase = async () => {
  await wait(20000);
  try {
    await AppDataSource.initialize();
    console.log("Data Source has been initialized!");
  } catch (err) {
    console.error("Error during Data Source initialization:", err);
    process.exit(1);
  }
};

initializeDatabase();

app.post('/users', async (req, res) => {
  try {
    const user = AppDataSource.getRepository(User).create(req.body);
    const result = await AppDataSource.getRepository(User).save(user);
    res.send(result);
  } catch (error) {
    res.status(500).send("Erro ao criar usuário");
  }
});

app.get('/users', async (req, res) => {
  try {
    const users = await AppDataSource.getRepository(User).find();
    res.json(users);
  } catch (error) {
    res.status(500).send("Erro ao obter usuários");
  }
});

app.post('/posts', async (req, res) => {
  try {
    const post = AppDataSource.getRepository(Post).create(req.body);
    const result = await AppDataSource.getRepository(Post).save(post);
    res.send(result);
  } catch (error) {
    res.status(500).send("Erro ao criar post");
  }
});

app.get('/posts', async (req, res) => {
  try {
    const posts = await AppDataSource.getRepository(Post).find({ relations: ['user'] });
    res.json(posts);
  } catch (error) {
    res.status(500).send("Erro ao obter posts");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
