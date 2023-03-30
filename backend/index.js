import express, { json } from 'express';
import dotenv from "dotenv";
import cors from "cors";
const app = express();
const port = 3000 || process.env.PORT;

app.use(json());
app.use(cors());
dotenv.config();

app.get('/', (req, res) => {
    res.json({msg: "vivero app"})
})

app.listen(port, () => {
    console.log(`APP WORKING ON PORT ${port}`)
});