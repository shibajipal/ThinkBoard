import express from "express"
import notesRoutes from "./routes/notesRoutes.js"
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";
const app = express();



//middleware
app.use(cors({
    origin: "http://localhost:5173",
}));
app.use(express.json()); 
app.use(rateLimiter);

app.use((req, res, next) => {
    console.log(`Req method is ${req.method} and Req URL is ${req.url}`);
    next();

   } )

app.use("/api/notes", notesRoutes);

connectDB().then(() =>{
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log("Hello World! Server has started on PORT : 5001!");
})

})

