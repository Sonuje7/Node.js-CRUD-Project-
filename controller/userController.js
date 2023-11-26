
const asyncHandler = require("express-async-handler")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require('../models/userModels')

//@desc Register user
//@route GEt /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password} = req.body;
    if( !username || !email || !password)
    {
        res.status(400);
        throw new Error("All fields are mandatory")
    }
    const userAvailable = await User.findOne({email})
    if(userAvailable)
    {
        res.status(400);
        throw new Error("User already Exist")
    }
    //hash Password
    const hashPassword = await bcrypt.hash(password, 10)
    console.log("Hashed Password :" ,hashPassword)
    const user = await User.create({
        username,
        email,
        password: hashPassword,
    })
    console.log(`User created ${user}`)
    if(user)
    {
        res.status(201).json({_id: user.id, email: user.email })
    }
    else{
        res.status(400);
        throw new Error('user data not valid')
    }
    res.json({message: "Register User" });
})

//@desc login user
//@route GEt /api/users/register
//@access public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if(!email || !password)
    {
     res.status(400)
     throw new Error("All Fields ara mandatory!")
    }
    const user = await User.findOne({email});
    //compare password with hash password
    if(user && (await bcrypt.compare(password,user.password))){
        const accessToken = jwt.sign({
            user:{
                username: user.username,
                email : user.email,
                id: user.id,
            },
        },
        process.env.ACCESS_TOKEN_SECERT,
            { expiresIn: "15m" }
        )
        res.status(200).json({accessToken})
    }else {
        res.status(401)
        throw new Error('Email or Password not valid!')
    }
    res.json({message: "Login User" });
})

//@desc current user ifo
//@route GEt /api/users/current
//@access private
const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user);
})


module.exports = { registerUser, loginUser, currentUser }