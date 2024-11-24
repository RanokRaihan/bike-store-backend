import app from "./app";
import { PORT } from "./config";
import connectDB from "./db";

const port = PORT || 3000;

// Connect to MongoDB
connectDB()
  .then(() => {
    // Start the server
    app.listen(port, () => {
      console.log(`server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB: ", error);
  });
