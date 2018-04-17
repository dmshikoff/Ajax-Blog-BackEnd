const model = require('../models/post')

function getAll(req, res, next){
    const posts = model.getAll()
    return res.status(200).send( {data: posts.data})
}

function getOne(req, res, next){
    console.log('hellooooo?')
    const post = model.getOne(req.params.id)
    if(post.data){
      return res.status(200).send({ data: post.data })
    }
    else if(post.error){
      return next({ status: 404, message: post.error })
    }
}

function create(req, res, next){
    const error = []
    if(!req.body.title){
        error.push({ status: 400, message:'Please include a title'})
    }
    if(!req.body.content){
        error.push({ status: 400, message:'Please include content'})    
    }
    const post = model.create(req.body.title, req.body.content)
    if(post.data){
      return res.status(201).send({ data: post.data })
    }
    else{
        return next(error)
    }
}

function update(req, res, next){
    const error = []
    if(!req.body.title){
        error.push({ status: 400, message:'Please include a title'})
    }
    if(!req.body.content){
        error.push({ status: 400, message:'Please include content'})    
    }
    const post = model.update(req.params.id, req.body.title, req.body.content)
    if(post.data){
      return res.status(200).send({ data: post.data })
    }
    else if(post.error) {
      return next({ status: 404, message: post.error })
    }
}

function remove(req, res, next){
    const post = model.remove(req.params.id)
    if(post.data){
      return res.status(200).send({ data: post.data })
    }
    else if(post.error){
        return next({ status: 404, message: post.error })
    }
}

module.exports = { getAll, getOne, create, update, remove }