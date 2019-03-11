let router = require('express').Router()
let Lists = require('../models/list')


//GET
router.get('/:boardId', (req, res, next) => {
  Lists.find({ boardId: req.params.boardId })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      console.log(err)
      next()
    })
})

//POST
router.post('/', (req, res, next) => {
  req.body.authorId = req.session.uid
  Lists.create(req.body)
    .then(newList => {
      res.send(newList)
    })
    .catch(err => {
      console.log(err)
      next()
    })
})


//DELETE
router.delete('/:id', (req, res, next) => {
  Lists.deleteOne({ _id: req.params.id, boardId: req.session.uid })
    .then(list => {
      // if (!list.boardId.equals(req.session.uid)) {
      //   return res.status(401).send("ACCESS DENIED!")
      // }
      // list.remove(err => {
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