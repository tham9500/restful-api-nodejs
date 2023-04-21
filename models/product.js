const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema(
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

const ProductModel = mongoose.model('Product', productSchema)

module.exports = ProductModel
