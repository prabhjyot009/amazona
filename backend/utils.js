import jwt from 'jsonwebtoken';// npm install jsonwebtoken --save // npm install dotenv --save 

export const generateToken = (user) => {//generateToken is a function that takes in a user object as an argument
  return jwt.sign(//jwt.sign() is a function that takes in an object, a string, and an object as arguments
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    `${process.env.JWT_SECRET}`,  //process.env.JWT_SECRET is a string that is equal to the JWT_SECRET environment variable
        {
      expiresIn: '30d',
    }
  );
};

export const isAuth = (req, res, next) => {//isAuth is a function that takes in a request object, a response object, and a next function as arguments
  const authorization = req.headers.authorization;//authorization is a string that is equal to the authorization header of the request object
  if (authorization) {
    const token = authorization.slice(7, authorization.length); // Bearer XXXXXX token is a string that is equal to the authorization string sliced from the 7th index to the end of the string
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        res.status(401).send({ message: 'Invalid Token' });
      } else {
        req.user = decode;
        next();
      }
    });
  } else {
    res.status(401).send({ message: 'No Token' });
  }
};