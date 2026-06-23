const { Pool } = require("pg");
require("dotenv").config({
  path: "./src/.env"
});

const BATCH_SIZE = 5000;
const TOTAL_BATCHES = 40;


const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});


const categories = [
  "Electronics",
  "Fashion",
  "Books",
  "Sports",
  "Home",
];


// Generate one product
function generateProduct(index) {

  const randomDate = () => {
    return new Date(
      Date.now() -
      Math.floor(
        Math.random() * 365 * 24 * 60 * 60 * 1000
      )
    );
  };


  return {
    name: `Product ${index}`,

    category:
      categories[
        Math.floor(Math.random() * categories.length)
      ],

    price:
      Math.floor(Math.random() * 10000) + 100,

    created_at: randomDate(),

    updated_at: randomDate(),
  };
}


// Insert one batch of 5000 products
async function insertProducts(products) {


  const values = products.map(product => {

    return `(
      '${product.name}',
      '${product.category}',
      ${product.price},
      '${product.created_at.toISOString()}',
      '${product.updated_at.toISOString()}'
    )`;

  });


  const query = `
    INSERT INTO products
    (
      name,
      category,
      price,
      created_at,
      updated_at
    )

    VALUES

    ${values.join(",")}
  `;


  await pool.query(query);

}


// Main seeding function
async function seedProducts() {


  try {


    for(
      let batchNumber = 0;
      batchNumber < TOTAL_BATCHES;
      batchNumber++
    ){


      const productsBatch = [];


      for(
        let i = 0;
        i < BATCH_SIZE;
        i++
      ){


        const productNumber =
          batchNumber * BATCH_SIZE + i + 1;


        productsBatch.push(
          generateProduct(productNumber)
        );


      }


      await insertProducts(productsBatch);


      console.log(
        `Batch ${batchNumber + 1}/${TOTAL_BATCHES} completed`
      );


    }


    console.log(
      "200000 products inserted successfully"
    );


  }


  catch(error){

    console.error(error);

  }


  finally{

    await pool.end();

  }


}



seedProducts();