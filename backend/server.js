import "./config/instrument.js";
import express from "express";
import cors from "cors"
import "dotenv/config";
import { connectDB } from "./config/db.js";
import * as Sentry from "@sentry/node";
import { clerkWebhooks } from "./controller/webHook.js";
import companyRoutes from './Routes/companyRoutes.js'
import connectCloudinary from "./config/cloudinary.js";
import jobRoutes from './Routes/jobRoutes.js'
import userRoutes from './Routes/userRoutes.js'
import {clerkMiddleware} from '@clerk/express'
//config
const app=express()
const port = 5001;

//middleware
app.use(express.json())
app.use(cors())
app.use(clerkMiddleware())

//DB Connection

connectDB();
await connectCloudinary()

Sentry.setupExpressErrorHandler(app);


//Routes
app.get('/',(req,res)=>{
    res.send("API Working");
})
app.get("/debug-sentry", function mainHandler(req, res) {
    throw new Error("My first Sentry error!");
  });

app.post(" /webhooks",clerkWebhooks);
app.use('/api/company', companyRoutes)
app.use('/api/jobs', jobRoutes)
app.use('/api/user', userRoutes)

app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`)
})


