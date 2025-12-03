import dotenv from "dotenv";
dotenv.config();

export default function authentication(req, res, next) {
  // Get the "Authorization" header from the request.
  // This should contain something like: "Basic dXNlcjpwYXNz"
  const authHeader = req.headers.authorization;
  console.log("Auth header:", authHeader);

  // If the header does not exist, ask the client to provide credentials
  if (!authHeader) {
    // Tells browser that Basic Authentication is required
    res.setHeader("WWW-Authenticate", 'Basic realm="Secure Area"');

    const err = new Error("You are not authenticated!");
    err.status = 401; // Unauthorized
    return next(err); // Pass error to Express error handler
  }

  // Extract the encoded part after "Basic "
  const encoded = authHeader.split(" ")[1];

  // Decode Base64 string into "username:password"
  const decoded = Buffer.from(encoded, "base64").toString();

  // Split decoded string into variables
  const [user, pass] = decoded.split(":");


  // Verify credentials
  if (user === process.env.USER && pass === process.env.PASSWORD) {
    // Credentials correct → allow request to continue
    return next();
  } else {
    // Wrong credentials → send 401 Unauthorized
    res.setHeader("WWW-Authenticate", 'Basic realm="Secure Area"');

    const err = new Error("Invalid credentials!");
    err.status = 401;
    return next(err);
  }
}
