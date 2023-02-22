import mongoose from "mongoose";
import { HistoryData } from "../AllInterfaces/AllInterface";

interface MainData extends HistoryData,mongoose.Document{}

const HistorySchema = new mongoose.Schema<HistoryData>({
    message:{
        type:String,
    },
    transactionReference:{
        type:Number,
    },
    transactionType:{
        type:Boolean,
    }
    
 
}
,{timestamps:true}
)

export default mongoose.model<MainData>("History",HistorySchema)