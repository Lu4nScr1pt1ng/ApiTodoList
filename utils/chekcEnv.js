require("dotenv").config();

const PORT = process.env.PORT;
const DBURL = process.env.DATABASE_URL;
const SECRET = process.env.SECRET;

function checkEnv() {
  console.log("[#] Checking dotenv");
  // Port server check
  if (!PORT) {
    errDot("Missing PORT");
  }

  // MongoDB url check
  if (!DBURL) {
    errDot("Missing DATABASE_URL");
  }

  // Secret for salt check
  if (!SECRET) {
    errDot("Missing SECRET");
  }

  function errDot(msg) {
    console.log(`[#] Dotenv error!`);
    console.log(`[#] Dotenv error log: ` + msg);
    throw new Error("[!] Dotenv Error");
  }
  console.log("[#] Dotenv checked(3/3)!!!");
}

module.exports = checkEnv