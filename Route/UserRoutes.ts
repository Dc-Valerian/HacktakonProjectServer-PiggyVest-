import express from 'express'
import { MakeTranfer, RegisterUser } from '../Controller/UserController'


const router = express.Router()

router.route("/register").post(RegisterUser)
router.route("/sendmoney/:UserId/:WalletID").patch(MakeTranfer)



export default router   