const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;
var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", require("./routes/productRouter"));
app.use("/api/reviews", require("./routes/reviewRouter"));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the application." });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
