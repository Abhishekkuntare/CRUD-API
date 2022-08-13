const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

//01 Connecting a mongo db
mongoose
  .connect("mongodb://localhost:27017/sample", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected with mongo db");
  })
  .catch((err) => {
    console.log(err);
  });

// 02 Creating a scheam
const productScheam = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
});

// 03 Creating a collection or model
const Product = new mongoose.model("Product", productScheam);

// 04 Creating a Product
app.post("/api/v1/product/new", async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

//05 Read Product or Get Product
app.get("/api/v1/products", async (req, res) => {
  const products = await Product.find();

  res.status(200).json({
    success: true,
    products,
  });
});

//06 Update Product
app.put("/api/v1/product/:id", async (req, res) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    res.status(500).json({
      success: false,
      message: "Product not Found",
    });
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    useFindAndModify: false,
    runValidators: true,
  });
  res.status(200).json({
    success: true,
    product,
  });
});

//06 Delete Product
app.delete("/api/v1/product/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(500).json({
      success: false,
      message: "Product not Found !",
    });
  }

  await product.remove();

  res.status(200).json({
    success: true,
    message: "Product is Deleted Successfully",
  });
});

app.listen(4000, () => {
  console.log("server is working http://localhost:4000");
});
