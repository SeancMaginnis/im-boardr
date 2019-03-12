let router = require('express').Router()
let Lists = require('../models/list')
let Tasks = require('../models/task')


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

router.get('/:id/tasks', (req, res, next) => {
  Tasks.find({ listId: req.params.id })
    .then(list => res.send(list))
    .catch(err => res.status(400).send(err))
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

router.put('/:id', (req, res, next) => {
  Lists.findById(req.params.id)
    .then(list => {
      if (!list.authorId.equals(req.session.uid)) {
        return res.status(401).send("ACCESS DENIED!")
      }
      list.update(req.body, (err) => {
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
  Lists.findOne({ _id: req.params.id, authorId: req.session.uid })
    .then(list => {
      list.remove(err => {
        if (err) {
          console.log(err)
          next()
          return
        }
        res.send("Successfully Deleted")
      })
        .catch(err => {
          res.status(400).send('ACCESS DENIED; Invalid Request')
        })
    })
})



module.exports = router