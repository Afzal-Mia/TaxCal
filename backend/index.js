import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { connectDB } from "./config/db.js"
import taxRoutes from "./routes/taxRoutes.js"
dotenv.config();

const app=express();
const PORT=process.env.PORT;

app.use(cors());
app.use(express.json());
//home route

app.get("/",(req,res)=>{
    res.send("Server is working Properly");
})
connectDB();
app.use('/api/tax',taxRoutes)

app.listen(PORT,()=>{
    console.log(`sever is running on http://localhost:${PORT}`);
})