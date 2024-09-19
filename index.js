import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import userRoutes from './Route/authRoutes.js';

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

// Routes
app.use('/users', userRoutes);

const PORT = process.env.PORT || 3001;

// Mongoose connection with options
mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("Database connected");

  app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
  });
})
.catch((err) => {
  console.error('MongoDB connection error:', err);
});



