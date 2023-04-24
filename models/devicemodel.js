const mongoose = require('mongoose')
const Schema = mongoose.Schema

const deviceSchema = new Schema(
  {
    uuid: String,
    highpressure: String,
    lowpressure: String,
    ariflow: String,
    watertemp: String,
    cooler: String,
    amp: String,
    volt: String,
    frequency: String,
    power: String,
    energy: String,
    pf: String,
    waterflow: String,
  },
  { timestamps: true, versionKey: false }
)

const DeviceModel = mongoose.model('Devicedata', deviceSchema)

module.exports = DeviceModel
