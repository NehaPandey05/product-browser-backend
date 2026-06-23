const pool = require("../db/database");

const getProducts = async (filters) => {

    let query = `
    SELECT *
    FROM products
    `;

    const conditions = [];
    const values = [];

    // Category Filter
    if (filters.category) {

        values.push(filters.category);

        conditions.push(
            `category = $${values.length}`
        );

    }

    // Minimum Price Filter
    if (filters.minPrice) {

        values.push(filters.minPrice);

        conditions.push(
            `price >= $${values.length}`
        );

    }

    // Maximum Price Filter
    if (filters.maxPrice) {

        values.push(filters.maxPrice);

        conditions.push(
            `price <= $${values.length}`
        );

    }
   if (
    filters.cursorCreatedAt &&
    filters.cursorId
) {

    values.push(filters.cursorCreatedAt);
    const createdAtIndex = values.length;

    values.push(filters.cursorId);
    const idIndex = values.length;

    conditions.push(
        `(created_at < $${createdAtIndex}
        OR
        (
            created_at = $${createdAtIndex}
            AND id < $${idIndex}
        ))`
    );

}

    // Add WHERE clause if filters exist
    if (conditions.length > 0) {

        query += `
        WHERE ${conditions.join(" AND ")}
        `;

    }
    // Sorting

if (filters.sort === "price_asc") {

    query += `
    ORDER BY price ASC
    `;

}

else if (filters.sort === "price_desc") {

    query += `
    ORDER BY price DESC
    `;

}
else {

    query += `
    ORDER BY created_at DESC,
             id DESC
    `;

}

    query += `
    LIMIT 20
    `;

    const result = await pool.query(
        query,
        values
    );

   const products = result.rows;

let nextCursor = null;

if (products.length > 0) {

    const lastProduct =
        products[products.length - 1];

    nextCursor = {
        cursorCreatedAt:
            lastProduct.created_at,

        cursorId:
            lastProduct.id
    };

}

return {
    products,
    nextCursor
};

};

module.exports = {
    getProducts
};