import express from "express";
import dotenv from "dotenv";
dotenv.config()

import './connection';
import productController from "./controllers/product.controllers";

const PORT = process.env.PORT || 8080

const app = express()

app.get('/api/products', productController.findAll);

app.get('/', (request, response) => {
  response.send("SERVER UP!")
})

app.listen(PORT, () => {
  console.log(`server running un port ${PORT}`);
})
