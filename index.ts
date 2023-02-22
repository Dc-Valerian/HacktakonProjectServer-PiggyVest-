import express,{Request,Response,Application} from "express"
import mongoose from "mongoose"
import cors from "cors"

const PORT:number = 9009

const url = "mongodb://0.0.0.0:27017/PaymentPiggyVest"

const app = express()
app.use(express.json())
app.use(cors())

app.get("/",(req:Request,res:Response)=>{
    res.status(200).json({
        message:"Api is ready for consumption"
    })
})


mongoose.connect(url).then(()=>{
    console.log(`DataBase is Connected`)
    
})


app.listen(PORT,()=>{
    console.log(`Listening to ${PORT}`)
    
})