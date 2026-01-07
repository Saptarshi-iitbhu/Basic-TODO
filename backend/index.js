import express from "express"
import cors from "cors"
import bodyParser from "body-parser"

const app = express();
const JWT_SECRET = "Saptarshi_Todo";

app.use(cors());
app.use(bodyParser.json());

export { JWT_SECRET };