import express from 'express'
import { MakeTranfer, RegisterUser ,fundWalletFromBank} from '../Controller/UserController'


const router = express.Router()

router.route("/register").post(RegisterUser)
router.route("/sendmoney/:UserId/:WalletID").post(MakeTranfer)
router.route("/creditWalletBank/:userId/:WalletId").post(fundWalletFromBank)



export default router   