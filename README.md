# Product Browser Backend 🚀

A scalable backend service for browsing a large product dataset. 
The project focuses on efficiently handling high-volume data using optimized APIs, filtering, and cursor-based pagination.

## 🌐 Live API

Backend is deployed on Render:
https://product-browser-backend-yfmb.onrender.com

## ✨ Features

- RESTful API for product browsing
- Handles 200,000+ product records
- Efficient product listing
- Cursor-based pagination for better performance on large datasets
- Filtering support
- PostgreSQL database integration
- Environment-based configuration
- Optimized database queries using connection pooling

## 🛠️ Tech Stack

- Node.js
- Express.js
- PostgreSQL
- pg (PostgreSQL client)
- dotenv
- REST APIs

## 📌 API Endpoint

### Get Products

Fetch products from the database with filtering and pagination support.

Method:
GET

Endpoint:
`/api/products`

Live API:
https://product-browser-backend-yfmb.onrender.com/api/products

Query Parameters:

- limit → Number of products to fetch
- cursor → Cursor value for pagination
- category → Filter products by category

### Example Request
```
/api/products?limit=20&category=Fashion
```


