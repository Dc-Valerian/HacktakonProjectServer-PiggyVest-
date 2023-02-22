import mongoose from "mongoose";
import { WalletData } from "../AllInterfaces/AllInterface";

interface MainData extends WalletData,mongoose.Document{}

const WalletSchema = new mongoose.Schema<WalletData>({
    Balance:{
        type:Number,
    },
    credit:{
        type:Number,
    },
    debit:{
        type:Number,
        required:true,
        unique:true,
        lowercase:true,
    }
    
 
}
,{timestamps:true}
)

export default mongoose.model<MainData>("wallets",WalletSchema)