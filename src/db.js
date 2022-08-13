import mongoose from "mongoose";

const heroku = process.env.NODE_ENV === "production";
console.log("is heroku : " + heroku);

if (!heroku) {
  mongoose.connect(process.env.DB_URL_LOCAL);
} else {
  mongoose.connect(process.env.DB_URL);
}

mongoose.connection.on("error", (error) => console.log("❌ DB Error", error));

mongoose.connection.once("open", () => console.log("✅ Connected to DB"));
