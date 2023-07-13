const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

//@desc register a user
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {

      const { username, email, password } = req?.body;
      if (!username || !email || !password) {
            res.status(400);
            throw new Error('All fields are mendatory');
      }

      const isUserAvailable = await User.findOne({ email: req?.body?.email });
      if (isUserAvailable) {
            res.status(400);
            throw new Error('User is already registered!')
      }


      // password hashing
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
            username,
            email,
            password: hashedPassword
      })


      if (user) {
            res.status(201).json({
                  _id: user?.id,
                  email: user?.email
            })
      } else {
            res.status(400);
            throw new Error('User data is not valid')
      }
      res.json({ message: "User created successfully!" })
});



//@desc login a user
//@route POST /api/users/register
//@access public
const loginUser = asyncHandler(async (req, res) => {
      const { email, password } = req.body;

      if (!email || !password) {
            res.status(400);
            throw new Error('All fields is mandatory')
      }

      const user = await User.findOne({ email });

      // compare password with hashed password
      if (user && (await bcrypt.compare(password, user.password))) {
            const accessToken = jwt.sign({
                  user: {
                        username: user.username,
                        email: user.email,
                        id: user.id
                  },

            }, process.env.ACCESS_TOKEN_SECRET,
                  { expiresIn: "15m" }
            )
            res.status(200).json({ accessToken })
      } else {
            res.status(401);
            throw new Error("Password is not valid");
      }

});



//@desc Current user
//@route GET /api/users/current
//@access Private
const currentUser = asyncHandler(async (req, res) => {
      console.log('check edddd', req);
      res.json(req.user);
});


module.exports = { registerUser, loginUser, currentUser }