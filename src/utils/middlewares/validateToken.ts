import * as jwt from 'jsonwebtoken';

const validateToken = (req, res, next) => {
  const authorizationHeader = req.headers.authorization;

  let result;
  if (authorizationHeader) {
    const token = req.headers.authorization.split(' ')[1]; // Bearer <token>

    const options = {
      expiresIn: '2d',
      issuer: 'http://localhost:3000',
    };

    try {
      result = jwt.verify(token, process.env.JWT_SECRET, options);

      req.decoded = result;
      next();
    } catch (err) {
      throw new Error(err);
    }
  } else {
    res.status(401).send(result);
  }
};

export { validateToken };
