export default function authentication(req, res, next) {
  const authHeader = req.headers.authorization;
  console.log("Auth header:", authHeader);

  if (!authHeader) {
    res.setHeader("WWW-Authenticate", 'Basic realm="Secure Area"');
    const err = new Error("You are not authenticated!");
    err.status = 401;
    return next(err);
  }

  const encoded = authHeader.split(" ")[1];
  const decoded = Buffer.from(encoded, "base64").toString();
  const [user, pass] = decoded.split(":");

  if (user === "admin" && pass === "password") {
    return next();
  } else {
    res.setHeader("WWW-Authenticate", 'Basic realm="Secure Area"');
    const err = new Error("Invalid credentials!");
    err.status = 401;
    return next(err);
  }
}
