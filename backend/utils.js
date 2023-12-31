import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      adhaar: user.adhaar,
      role: user.role,
    },
    process.env.JWT_SECRET || "somethingsecret",
    {
      expiresIn: "5d",
    }
  );
};

export const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length); // Accesing token from headers authorization: "Bearer xxxxxx" by slicing
    process.env.JWT_SECRET || "somethingsecret",
      jwt.verify(token, "somethingsecret", (err, decode) => {
        // note decode contains all information of user and its assigned to req.user ,,which is forwared accordingly
        if (err) {
          res.status(401).send({ message: "invalid token" });
        } else {
          req.user = decode; //all information of user and its assigned to req.user from decode...
          next();
        }
      });
  } else {
    res.status(401).send({ message: "No token" });
  }
};

export const isAdminAuth = (req, res, next) => {
  const authorization = req.headers.authorization;

  if (authorization) {
    const token = authorization.slice(7, authorization.length); // Accessing token from headers authorization: "Bearer xxxxxx" by slicing

    jwt.verify(
      token,
      process.env.JWT_SECRET || "somethingsecret",
      (err, decode) => {
        if (err) {
          res.status(401).send({ message: "Invalid token" });
        } else {
          if (decode.role === "admin") {
            // User is an admin, proceed to the next middleware or route handler
            req.user = decode;
            next();
          } else {
            res.status(403).send({ message: "Admin access required" });
          }
        }
      }
    );
  } else {
    res.status(401).send({ message: "No token" });
  }
};
