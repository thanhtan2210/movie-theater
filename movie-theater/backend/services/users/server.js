import express from 'express';
import dotenv from 'dotenv';
import { Sequelize, DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

dotenv.config();
const app = express();
app.use(express.json());

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
 host: process.env.DB_HOST || 'localhost',
 dialect: 'mysql',
 logging: false
});

const User = sequelize.define('User', {
 username: { type: DataTypes.STRING, unique: true },
 password: { type: DataTypes.STRING }
});

app.post('/register', async (req, res) => {
 const { username, password } = req.body;
 const hash = await bcrypt.hash(password,10);
 const user = await User.create({ username, password: hash });
 res.status(201).json({ id: user.id, username: user.username });
});

app.post('/login', async (req, res) => {
 const { username, password } = req.body;
 const user = await User.findOne({ where: { username } });
 if (!user) return res.status(400).json({ message: 'Invalid credentials' });
 const valid = await bcrypt.compare(password, user.password);
 if (!valid) return res.status(400).json({ message: 'Invalid credentials' });
 const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });
 res.json({ token });
});

const PORT = process.env.PORT ||4002;

sequelize.authenticate().then(() => sequelize.sync()).then(() => {
 app.listen(PORT, () => console.log(`User service running on ${PORT}`));
}).catch(err => console.error(err));
