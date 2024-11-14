
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors');
const jwt = require('jsonwebtoken');

const userModel = require('./model/userModel');

const app = express();

app.use(cors());
app.use(bodyParser.json());



app.get('/createUser', ( req, res ) => {
    res.send('hellow world');
    console.log(console.log('haidi'));
    res.json({ result: true, msg: "get create User successfull"});
});



app.post('/createUser', async ( req, res ) => {
    const { username, email, password } = req.body;
    if(!username || !email || !password ) {
        console.log('complete credentails', username, email, password );
        return res.json({ result: false, msg: 'username, email, password is not right. Problem in Create User'})
    }

    const newUser = new userModel({ username, email, password });
    const newUserSave = await newUser.save();
    if(!newUserSave) return res.json({ result: false, msg: "Can't create new user", data: null});
    res.json({ result: true, msg: "post create User successfull", data: null});
});



app.post('/login', async ( req, res ) => {
    const user = await userModel.findOne({ username: req.body.username });
    if( !user || user.username != req.body.username || user.password != req.body.password ) {
        return res.json({ result: false, msg: 'Invalid user name or password', data: null});
    }
    const accessToken = jwt.sign({ username: user.username }, process.env.JWT_TOKEN_SECRET, { expiresIn: '15m' });
    if(accessToken) {
        return res.json({ result: true, msg: 'Login succeessful', data: { accessToken, isAdmin : user.isAdmin, user: user  }});
    }else {
        return res.status(403).json({ result: false, msg:'Login failed', data: null });
    }
    
    // return res.json({ result: true, msg: 'user login successful', data: user });
});

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) return res.sendStatus(401).json({ result: false, msg: 'token is wrong, authenticateToken', data: null });
    
    jwt.verify(token, process.env.JWT_TOKEN_SECRET, (err, user) => {
        if (err) {
            console.log(err);
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    });
}



app.get('/getAllUsers', authenticateToken, async ( req, res ) => {
    const users = await userModel.find();
    if(!users) return res.json({ result: false, msg: 'Issue on getAllUser api', data: users });
    res.json({ result: true, msg: 'User data send successfully', data: users });
});

app.get('/user/:id', async ( req, res ) => {
    const user = await userModel.findById(req.params.id);
    console.log(user)
    user.password = "";
    if(!user) return res.send(400).json({ details: false, msg: 'User not found', data: null });
    res.json({ result: true, msg: 'user data found successfully', data: user })
})



app.delete('/deleteUser/:id', async ( req, res ) => {
    const userId = req.params.id;
    const result = await userModel.findByIdAndDelete(userId);
    if(!result) return res.json({ result: false, msg: 'Issue on deleteUser api', data: null });
    return res.json({ result: true, msg: 'User deleted successfully', data: null });
});

app.put('/updateUser/:id', async ( req, res ) => {
    const userId = req.params.id;
    const updatedUser = req.body;
    console.log(userId, updatedUser)
    const result = await userModel.findByIdAndUpdate(userId, updatedUser, { new: true });
    console.log(result);
    if(!result) return res.json({ result: false, msg: 'Issue on updateUser api', data: null });
    return res.json({ result: true, msg: 'User updated successfully', data: result });
})



const mongoose = require('mongoose');
const mongooseConnect = mongoose.connect('mongodb://127.0.0.1:27017/userManagmentWeek19');

const PORT = process.env.PORT;
app.listen(PORT || 3200, () => console.log("server is running on PORT " + PORT + "..."));