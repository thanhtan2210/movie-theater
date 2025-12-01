import express from 'express';
import dotenv from 'dotenv';
import { Sequelize, DataTypes } from 'sequelize';
import cors from 'cors';

import bookingRoutes from './routes/bookingRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/bookings', bookingRoutes);


const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
 host: process.env.DB_HOST || 'localhost',
 dialect: 'mysql',
 logging: false
});

// Define a placeholder route
app.get('/', (req, res) => {
    res.json({ message: 'Booking service is running.' });
});

const PORT = process.env.PORT || 4003;

sequelize.authenticate().then(() => {
    console.log('Database connected...');
    app.listen(PORT, () => console.log(`Booking service running on ${PORT}`));
}).catch(err => console.error('Error: ' + err));
