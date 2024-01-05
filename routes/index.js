const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
require('../models/users.model');
const User = mongoose.model('User')

//CRUD Operations
router.post('/create', async (req,res)=>{
    try{
        const user = new User(req.body)
        user.password = bcrypt.hashSync(user.password,bcrypt.genSaltSync(10))
        const result = await User.create(user);
        res.send(`${result.username} successfully created!!`)
    }catch(err){
        res.status(500).send(err.message)
    }
})
router.get('/read/:username', async (req,res)=>{
    try{
        const username = req.params.username
        const result = await User.findOne({username});
        if(result)
            return res.send(result)
        else 
            return res.status(404).send(`${username} does not exist`)
    }catch(err){
        res.status(500).send(err)
    }
})
//Reading multiple records
router.get('/read', async (req,res)=>{
    try{
        const result = await User.find();
        return res.send(result)
    }catch(err){
        res.status(500).send(err)
    }
})
router.put('/update', async (req,res)=>{
    try{
        const username = req.body.username
        const newNickName = req.body.nickname
        const result = await User.findOneAndUpdate(
            { username: username },
            {
              $set: {
                nickname: newNickName,
              }
            },
            { new: true }
          );
        res.send(result)
    }catch(err){
        res.status(500).json(err.message)
    }
})
router.delete('/delete', async (req,res)=>{
    try{
        const username = req.body.username
        const result = await User.deleteOne({username});
        res.send(result)
    }catch(err){
        res.status(500).json(err.message)
    }
})
module.exports = router