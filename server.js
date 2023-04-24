const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Device = require('./models/devicemodel')

const MONGODB_URI =
  process.env.MONGODB_URI ||
  'mongodb+srv://tham6524:Kapomb24032541@cluster0.anxan0y.mongodb.net/test'
const PORT = process.env.PORT || 9000

mongoose.connect(MONGODB_URI, { useNewUrlParser: true })

mongoose.connection.on('error', err => {
  console.error('MongoDB error', err)
})

app.use(express.json())

app.get('/devicedata', async (req, res) => {
  const devicedata = await Device.find({})
  console.log(`get data`);
  res.json(devicedata)
})

app.get('/devicedata/:id', async (req, res) => {
  const { id } = req.params

  try {
    const devicedata = await Device.findById(id)
    res.json(devicedata)
  } catch (error) {
    res.status(400).json(error)
  }
})

app.post('/savedevicedata', async (req, res) => {
  const payload = req.body
  try {
    const devicedata = new Device(payload)
    await devicedata.save()
    console.log(`save data`);
    res.status(201).end()
  } catch (error) {
    res.status(400).json(error)
  }
})

app.put('/savedevicedata/:id', async (req, res) => {
  const payload = req.body
  const { id } = req.params

  try {
    const devicedata = await Device.findByIdAndUpdate(id, { $set: payload })
    res.json(devicedata)
  } catch (error) {
    res.status(400).json(error)
  }
})

app.delete('/removedevicedata/:id', async (req, res) => {
  const { id } = req.params

  try {
    await devicedata.findByIdAndDelete(id)
    res.status(204).end()
  } catch (error) {
    res.status(400).json(error)
  }
})

app.listen(PORT, () => {
  console.log(`Application is running on port ${PORT}`)
})
