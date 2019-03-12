let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
let Tasks = require('./task')


let list = new Schema({
  title: { type: String, required: true },
  authorId: { type: ObjectId, ref: 'User', required: true },
  boardId: { type: ObjectId, ref: 'Board', required: true }
}, { timestamps: true })


//CASCADE ON DELETE

list.pre('remove', function (next) {
  //lets find all the lists and remove them
  this._id //THIS IS THE BOARD
  Promise.all([
    //Tasks.deleteMany({ boardId: this._id }),
    Tasks.deleteMany({ listId: this._id })
  ])
    .then(() => next())
    .catch(err => next(err))
})


module.exports = mongoose.model('List', list)