import { Application, Router } from "express";
import express from 'express'
import dotenv from 'dotenv'
import contactRouter from './routes';
import cors from 'cors';
import sequelize from './db'
import model from './model/contact';

dotenv.config();
const app: Application = express();
const PORT = process.env.PORT;

app.use(
  cors({
    
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use("/api", contactRouter);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    app.listen(PORT, () => console.log(`server launch (port ${PORT})`));
  } catch (e) {
    console.log(e);
  }
};

start();
