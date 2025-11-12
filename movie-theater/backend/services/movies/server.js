import express from 'express';
import dotenv from 'dotenv';
import { Sequelize, DataTypes } from 'sequelize';

dotenv.config();

const app = express();
app.use(express.json());

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
 host: process.env.DB_HOST || 'localhost',
 dialect: 'mysql',
 logging: false
});

const Movie = sequelize.define('Movie', {
 title: { type: DataTypes.STRING, allowNull: false },
 description: { type: DataTypes.TEXT },
 duration: { type: DataTypes.INTEGER }
});

app.get('/movies', async (req, res) => {
 const movies = await Movie.findAll();
 res.json(movies);
});

app.post('/movies', async (req, res) => {
 const movie = await Movie.create(req.body);
 res.status(201).json(movie);
});

const PORT = process.env.PORT ||4001;

sequelize.authenticate().then(() => sequelize.sync()).then(() => {
 app.listen(PORT, () => console.log(`Movie service running on ${PORT}`));
}).catch(err => console.error(err));
