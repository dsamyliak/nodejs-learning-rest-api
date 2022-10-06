const jwt = require("jsonwebtoken");
require("dotenv").config();

const { SECRET_KEY } = process.env;

const payload = {
  id: "633e0885925d2e7a4af869aa"
};

const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
// console.log(token);

const decodeToken = jwt.decode(token);
// console.log(decodeToken);

const wrongToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzM2UwODg1OTI1ZDJlN2E0YWY4NjlhYSIsImlhdCI6MTY2NTA1OTQ2NSwiZXhwIjoxNjY1MDYzMDY1fQ.9EBjBXfWYzlWA653JCrouon8losHDuJmlisVmNC1G6S";

try {
  const result1 = jwt.verify(token, SECRET_KEY);
  console.log(result1);
  const result2 = jwt.verify(wrongToken, SECRET_KEY);
  console.log(result2);
} catch (error) {
  console.log(error.message);
}