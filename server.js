const app = require("./app.js");
const dotenv = require("dotenv");

const connectDatabase = require("./config/database.js");


dotenv.config({ path: __dirname + "/config/config.env" });

const PORT = process.env.PORT;

connectDatabase(process.env.MONGODB_URL);



app.listen(PORT, () => {
  console.log("server is running on", PORT);
});

