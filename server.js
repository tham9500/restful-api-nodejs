const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Product = require('./models/product')

const MONGODB_URI =
  process.env.MONGODB_URI ||
  'mongodb+srv://tham6524:Kapomb24032541@cluster0.anxan0y.mongodb.net/test'
const PORT = process.env.PORT || 9000

mongoose.connect(MONGODB_URI, { useNewUrlParser: true })

mongoose.connection.on('error', err => {
  console.error('MongoDB error', err)
})

app.use(express.json())

app.get('/products', async (req, res) => {
  const products = await Product.find({})
  console.log(`get data`);
  res.json(products)
})

app.get('/products/:id', async (req, res) => {
  const { id } = req.params

  try {
    const product = await Product.findById(id)
    res.json(product)
  } catch (error) {
    res.status(400).json(error)
  }
})

app.post('/products', async (req, res) => {
  const payload = req.body
  try {
    const product = new Product(payload)
    await product.save()
    console.log(`save data`);
    res.status(201).end()
  } catch (error) {
    res.status(400).json(error)
  }
})

app.put('/products/:id', async (req, res) => {
  const payload = req.body
  const { id } = req.params

  try {
    const product = await Product.findByIdAndUpdate(id, { $set: payload })
    res.json(product)
  } catch (error) {
    res.status(400).json(error)
  }
})

app.delete('/products/:id', async (req, res) => {
  const { id } = req.params

  try {
    await Product.findByIdAndDelete(id)
    res.status(204).end()
  } catch (error) {
    res.status(400).json(error)
  }
})

app.listen(PORT, () => {
  console.log(`Application is running on port ${PORT}`)
})
