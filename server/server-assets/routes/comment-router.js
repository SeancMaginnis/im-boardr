let router = require('express').Router()
let Comments = require('../models/comment')

//GET
router.get('/:taskId', (req, res, next) => {
  Comments.findById({ taskId: req.params.taskId })
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
  Comments.create(req.body)
    .then(newComment => {
      res.send(newComment)
    })
    .catch(err => {
      console.log(err)
      next()
    })
})

//Post subComment onto comment
router.put('/:id/subcomments', (req, res, next) => {
  Comments.findById(req.params.id)
    .then(comment => {
      if (!req.body._id) {
        comment.subComments.push(req.body)
      } else {
        for (let i = 0; i < comment.subComments.length; i++) {
          let sc = comment.subComments[i]
          if (sc._id.toString() == req.body._id) {
            comment.subComments.splice(i, 1)
          }
        }
      }
      return comment.save()
    })
    .then(() => res.send('Comment Modified'))
    .catch(err => res.status(400).send(err))
})


//PUT
router.put('/:id', (req, res, next) => {
  Comments.findById(req.params.id)
    .then(comment => {
      if (!comment.authorId.equals(req.session.uid)) {
        return res.status(401).send("ACCESS DENIED!")
      }
      comment.update(req.body, (err) => {
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
//edit subsomment
router.put('/:commentId/subComments/:id', async (req, res, next) => {
  Comments.findById(req.params.commentId)
    .then(comment => {
      let subcomment = comment.subComments.id(req.params.id)
      comment.subComments.splice(comment.subComments.indexOf(subcomment), 1, req.body)
      comment.save(err => {
        if (err) {
          res.status(400).send(err)
        }
        res.status(201).send(comment)
      })
    })
})

//delete subcomment
router.delete('/:commentId/subComments/:id', (req, res, next) => {
  Comments.findById(req.params.commentId)
    .then(comment => {
      comment.subComments.id(req.params.id).remove()
      comment.save(err => {
        if (err) {
          res.status(400).send(err)
        }
        res.status(201).send(comment)
      })
    })
})

//DELETE
router.delete('/:id', (req, res, next) => {
  Comments.deleteOne({ _id: req.params.id, authorId: req.session.uid })
    .then(comment => {
      // if (!comment.listId.equals(req.session.uid)) {
      //   return res.status(401).send("ACCESS DENIED!")
      // }
      // comment.remove(err => {
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