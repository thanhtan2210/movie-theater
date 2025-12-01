import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(cors());

const movieService = process.env.MOVIE_SERVICE_URL || 'http://localhost:4001';
const userService = process.env.USER_SERVICE_URL || 'http://localhost:4002';
const bookingService = process.env.BOOKING_SERVICE_URL || 'http://localhost:3003';

app.use('/movies', createProxyMiddleware({ target: movieService, changeOrigin: true, pathRewrite: {'^/movies' : '/movies'} }));
app.use('/auth', createProxyMiddleware({ target: userService, changeOrigin: true, pathRewrite: {'^/auth' : ''} }));
app.use('/bookings', createProxyMiddleware({ target: bookingService, changeOrigin: true, pathRewrite: {'^/bookings' : '/bookings'} }));

const PORT = process.env.PORT ||4000;
app.listen(PORT, () => console.log(`API Gateway running on ${PORT}`));
