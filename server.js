const app = require("./app");
const dotenv = require("dotenv");

const connectDatabase = require("./config/database");

dotenv.config({ path: "ecommercebackend/config/config.env" });

const PORT = process.env.PORT;

connectDatabase(process.env.MONGODB_URL);


app.listen(PORT, () => {
  console.log("server is running on", PORT);
});
