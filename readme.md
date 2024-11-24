# Bike Store Backend

This project is a backend service for a bike store application. It provides APIs to manage bikes, and orders.

## Live Link

You can access the live application [here](https://bike-store-backend.vercel.app/).

## Features

- Manage bikes inventory
- Process orders
- Calculate total revenue

## Technologies Used

- Node.js
- Typescript
- Express
- MongoDB
- Mongoose

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/RanokRaihan/bike-store-backend.git
   ```

2. Navigate to the project directory:

   ```bash
   cd bike-store-backend
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Set up environment variables:
   Create a `.env` file in the root directory and add the following:

   ```env
   PORT=3000
   DB_NAME=your_database_name
   MONGODB_URI=your_mongodb_connection_string
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

## Usage

- The server will be running on `http://localhost:3000`.
- Use a tool like Postman to interact with the APIs.

## API Endpoints

- `GET /api/products` - Get all bikes
- `GET /api/products/:productId` - Get single bike by id
- `POST /api/products` - Add a new bike
- `POST /api/products/insertMany` - Insert an array of bike data
- `PUT /api/products/:productId` - Update Bike data
- `DELETE /api/products/:productId` - Delete single bike

- `POST /api/orders` - place order
- `GET /api/orders` - Get all orders
- `GET /api/orders/revenue` - get total revenue for order collection
