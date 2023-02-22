import mongoose from "mongoose";
import { HistoryData } from "../AllInterfaces/AllInterface";

interface MainData extends HistoryData,mongoose.Document{}

const HistorySchema = new mongoose.Schema<HistoryData>({
    Balance:{
        type:Number,
    },
    transactionReference:{
        type:Number,
    },
    transactionType:{
        type:String,
    }
    
 
}
,{timestamps:true}
)

export default mongoose.model<MainData>("histories",HistorySchema)