const fs = require('fs')
const path = require('path')
const shortid = require('shortid')
const file = path.join(__dirname, 'db.json')

function getAll(){
    const contents = fs.readFileSync(file, 'utf-8')
    const posts = JSON.parse(contents)

    return { data: posts }
}

function getOne(id){
    const contents = fs.readFileSync(file, 'utf-8')
    const posts = JSON.parse(contents)
  
    const post = posts.find(post => post.id === id)
  
    if(post) {
      return { data: post }
    }
    else {
      return { error: 'Post Not Found' }
    }
}

function create(title, content){
    const contents = fs.readFileSync(file, 'utf-8')
    const posts = JSON.parse(contents)
  
    const post = { id: shortid.generate(), title, content }
    posts.push(post)
    fs.writeFileSync(file, JSON.stringify(posts))
  
    return { data: post }
}

function update(id, title, content){
    const error = []
    const contents = fs.readFileSync(file, 'utf-8')
    let posts = JSON.parse(contents)
    const post = posts.find(post => post.id === id)
  
    if(post){
        post.title = title ? title : post.title
        post.content = content ? content : post.content
        fs.writeFileSync(file, JSON.stringify(posts))
        return { data: post}
    }
    else{
        error.push({error: 'Post Not Found'})
    }
}

function remove(id){
    const contents = fs.readFileSync(file, 'utf-8')
    let posts = JSON.parse(contents)
    const post = posts.find(post => post.id === id)
    
    if(post){
      posts = posts.filter(post => post.id !== id)
      delete post.id
      fs.writeFileSync(file, JSON.stringify(posts))
      return { data: post}
    }
    else {
      return { error: "Post Not Found"}
    }
}

module.exports = { getAll, getOne, create, update, remove }