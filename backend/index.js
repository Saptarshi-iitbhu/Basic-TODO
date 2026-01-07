import express from "express"
import zod from "zod"
import jwt from "jsonwebtoken"
import cors from "cors"

const app = express()

app.use(cors())

app.post('/sign-in')