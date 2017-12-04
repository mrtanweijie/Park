import mongoose from 'mongoose'
const Schema = mongoose.Schema
const NewsSchema = new Schema(
  {
    title: { type: 'String', required: true },
    url: { type: 'String', required: true },
    recommend: { type: Boolean, default: false },
    source: { type: Number, required: true, default: 0 },
    status: { type: Number, required: true, default: 0 },
    createdTime: { type: Date, default: Date.now }
  },
  {
    collection: 'news'
  }
)

export default mongoose.model('news', NewsSchema)
