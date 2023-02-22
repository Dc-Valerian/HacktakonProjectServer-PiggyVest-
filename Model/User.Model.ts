import mongoose from "mongoose";
import { UserData } from "../AllInterfaces/AllInterface";

interface MainData extends UserData,mongoose.Document{}

const UserSchema = new mongoose.Schema<UserData>({
    name:{
        type:String,
        required:true
    },
    userName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
    },
    password:{
        type:String,
    },
    phoneNumber:{
        type:Number,
        required:true
    },
    accountNumber:{
        type:Number,
    },
    verified:{
        type:Boolean,
    },
    wallet:[
        {
            type:mongoose.Schema.Types.ObjectId,
            re:"wallets"
        }
    ],
    history:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"histories",
        }
    ]
 
}
,{timestamps:true}
)

export default mongoose.model<MainData>("userModel",UserSchema)