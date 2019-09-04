require('dotenv').config()
const express = require('express')
const usersCtrl = require('./Controller/usersController')
const {SERVER_PORT} = process.env
const PORT = SERVER_PORT || 3000
const app = express()

app.use(express.json())

app.get('/api/user', usersCtrl.getUsers)
app.get('/api/user/:userId', usersCtrl.getUserById)
app.get('/api/admin', usersCtrl.getAdmins)
app.get('/api/nonadmin', usersCtrl.getNonAdmins)
app.get('/api/type/:type', usersCtrl.getByType)
app.put('/api/user/:userId', usersCtrl.updateByUserId)
app.post('/api/user', usersCtrl.createUser)
app.delete('/api/user/:userId', usersCtrl.deleteUser)

app.listen(PORT, ()=> console.log(` ^.^ Welcome to Port ${PORT}`))