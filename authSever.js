require('dotenv').config()
const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
app.use(express.json())

let refreshtokens = []

app.post('/token', (req,res) => {
    const refreshtoken = req.body.token;
    if (refreshtoken == null) return res.status(401)
    if(!refreshtokens.includes(refreshtoken)) return res.status(403)
    jwt.verify(refreshtoken, process.env.access_token, (err, user)=>{
        if(err) return res.status(403)
        const accessToken = generatetoken({name : user.name})
        res.json({accessToken: accessToken})
    })
})

app.delete('/', (req,res)=>{
    refreshtokens = []
    res.status(204).send("Deleted")
})

app.post('/', (req,res)=>{
    const username = req.body.username
    const user = {name: username}
    const accessToken = generatetoken(user)
    const refreshtoken = jwt.sign(user, process.env.access_token);
    refreshtokens.push()
    res.json({accesstoken: accessToken, refreshtoken: refreshtoken })
})

function generatetoken(user){
    return jwt.sign(user, process.env.access_token, {expiresIn : '1m' })
}

app.listen(5152, ()=>console.log('Running on port 5152'))