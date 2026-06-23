const express = require("express");
const { Pool } = require("pg");
const productRoutes = require("./routes/productRoutes");
const path = require("path");



require("dotenv").config();


const app = express();


app.use(express.json());
app.use(
    express.static(
        path.join(__dirname, "../public")
    )
);

app.use("/api", productRoutes);


// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
 
});


// Test route
app.get("/", (req, res) => {
  res.send("Server is running");
});



// Get products
app.get("/products", async (req, res) => {

  try {

    const limit = 20;


    const result = await pool.query(
      `
      SELECT *
      FROM products
      ORDER BY updated_at DESC, id DESC
      LIMIT $1
      `,
      [limit]
    );


    res.json({
      products: result.rows
    });


  } catch(error) {

    console.error(error);

    res.status(500).json({
      message:"Server error"
    });

  }

});



// Start server
app.listen(5000, () => {

  console.log(
    "Server running on port 5000"
  );

});