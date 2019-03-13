let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
let List = require('./list')
let Comments = require('./comment')

let task = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  deadline: { type: String },
  authorId: { type: ObjectId, ref: 'User', required: true },
  listId: { type: ObjectId, ref: 'List', required: true }
}, { timestamps: true })

task.pre('remove', function (next) {
  //lets find all the lists and remove them
  this._id //THIS IS THE BOARD
  Promise.all([
    //Tasks.deleteMany({ boardId: this._id })
    Comments.remove({ taskId: this._id })
  ])
    .then(() => next())
    .catch(err => next(err))
})

module.exports = mongoose.model("Task", task)