import "dotenv/config";
import "./db";
import "./models/Kangi";
import "./models/Japan";
import app from "./server.js";

const PORT = 4000;

const handleListening = () =>
    console.log(`✅ Server listening on http://localhost:${PORT}`);

app.listen(PORT, handleListening);
