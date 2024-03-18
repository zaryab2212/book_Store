const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { connect } = require("mongoose");
const { conection } = require("./Database/db");
const bookRoutes = require("./routes/book");
const authRoutes = require("./routes/auth");
const cartRoutes = require("./routes/cart");
const globalErrors = require("./Middlwares/globalErrors");
const cookieparser = require("cookie-parser");
const { authorized } = require("./Middlwares/authorized");
const app = express();
dotenv.config();

//Middleware
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(cookieparser());

// Routes

app.use("/book", bookRoutes);
app.use("/auth", authRoutes);
app.use("/cart", authorized, cartRoutes);

// /Db Connecgion

conection();

app.use(globalErrors);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is listening on Post ${port}`);
});
