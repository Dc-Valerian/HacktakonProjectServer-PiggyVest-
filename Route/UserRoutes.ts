import express from 'express'
import { RegisterUser } from '../Controller/UserController'


const router = express.Router()

router.route("/register").post(RegisterUser)



export default router   