"use strict"

import express from "express"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import { dbConnection } from "./mongo.js"
import authRoutes from "../src/auth/auth.routes.js"
import apiLimiter from "../src/middlewares/validas-cant-peticiones.js"
import courseRoutes from "../src/course/course.router.js"
import userRoutes from "../src/user/user.router.js"

const middlewares = (app) =>{
    app.use(express.urlencoded({extended: false}))
    app.use(express.json())
    app.use(cors())
    app.use(helmet())
    app.use(morgan("dev"))
    app.use(apiLimiter)
}

const routes = (app) =>{
    app.use("/academicSystem/v1/auth", authRoutes)
    app.use("/academicSystem/v1/course", courseRoutes)
    app.use("/academicSystem/v1/user", userRoutes)
}

const conectarDB = async ()=> {
    try{
        await dbConnection()
    }catch(err){
        console.log(`Database connection faile: ${err}`)
        process.exit(1)
    }
}

export const initServer = () =>{
    const app = express()
    try{
        middlewares(app)
        conectarDB()
        routes(app)
        app.listen(process.env.PORT)
        console.log(`Server running on port ${process.env.PORT}`)
    }catch(err){
        console.log(`Server init failed: ${err}`)
    }
}