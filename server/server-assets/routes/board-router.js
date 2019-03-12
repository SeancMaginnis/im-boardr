let router = require('express').Router()
let Boards = require('../models/board')
let List = require('../models/list')
//GET
router.get('/', (req, res, next) => {
  Boards.find({ authorId: req.session.uid })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      console.log(err)
      next()
    })
})

router.get('/:id/lists', (req, res, next) => {
  List.find({ boardId: req.params.id })
    .then(board => res.send(board))
    .catch(err => res.status(400).send(err))
})

//POST
router.post('/', (req, res, next) => {
  req.body.authorId = req.session.uid
  Boards.create(req.body)
    .then(newBoard => {
      res.send(newBoard)
    })
    .catch(err => {
      console.log(err)
      next()
    })
})

//PUT
router.put('/:id', (req, res, next) => {
  Boards.findById(req.params.id)
    .then(board => {
      if (!board.authorId.equals(req.session.uid)) {
        return res.status(401).send("ACCESS DENIED!")
      }
      board.update(req.body, (err) => {
        if (err) {
          console.log(err)
          next()
          return
        }
        res.send("Successfully Updated")
      });
    })
    .catch(err => {
      console.log(err)
      next()
    })
})

//DELETE
router.delete('/:id', (req, res, next) => {
  Boards.deleteOne({ _id: req.params.id, authorId: req.session.uid })
    .then(board => {
      // if (!board.authorId.equals(req.session.uid)) {
      //   return res.status(401).send("ACCESS DENIED!")
      // }
      // board.remove(err => {
      //   if (err) {
      //     console.log(err)
      //     next()
      //     return
      //   }
      res.send("Successfully Deleted")
    })
    .catch(err => {
      res.status(400).send('ACCESS DENIED; Invalid Request')
    })
})


module.exports = router