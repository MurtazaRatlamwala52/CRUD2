require('dotenv').config()
const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
app.use(express.json());

const users = [
    {
        username: 'Murtaza',
        post: 'post1'
    },
    {
        username: 'ABC',
        post: 'post2'
    }
]

app.get('/', inTheMiddle, (req,res)=>{
    res.json(users.filter(user => user.username === req.user.name))
})

function inTheMiddle(req,res,next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1]
    if(token == null) return res.status(401).send('User not authenticated')

    jwt.verify(token, process.env.access_token, (err, user)=>{
        if(err) return res.status(403).send('Unauthorized ')
        req.user = user
        next()
    })
}

app.listen(5253, ()=>console.log('Connection Success on port 5253'))