let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
let Task = require('./task')
let Comment = require('./comment')

let subComment = new Schema({
  description: { type: String, required: true },
  authorId: { type: ObjectId, ref: 'User', required: true }
}, { timestamps: true })

let comment = new Schema({
  description: { type: String, required: true },
  authorId: { type: ObjectId, ref: 'User', required: true },
  taskId: { type: ObjectId, ref: 'Task', required: true },

  subComments: [subComment]
}, { timestamps: true })


module.exports = mongoose.model("Comment", comment)