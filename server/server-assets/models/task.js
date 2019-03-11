let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
let List = require('./list')

let task = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  deadline: { type: String },
  authorId: { type: ObjectId, ref: 'User', required: true },
  listId: { type: ObjectId, ref: 'List', required: true },
  boardId: { type: ObjectId, ref: 'Board', required: true }
}, { timestamps: true })

module.exports = mongoose.model("Task", task)