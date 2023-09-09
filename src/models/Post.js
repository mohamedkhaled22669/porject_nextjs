import mongoose from 'mongoose'

const {Schema} = mongoose

const postSchema = new Schema({
  product_name: {
    type:String,
    require: true
  },
  Category: {
    type:String,
    require: true
  },
  price: {
    type:String,
    require: true
  },
  contact: {
    type:String,
    require: true
  },
  description: {
    type:String,
    require: true
  },
  image: {
    type:String,
    require: true
  },
  username: {
    type:String,
    require: true
  },
},{timestamps: true})


export default mongoose.model.Post || mongoose.model('Post',postSchema)