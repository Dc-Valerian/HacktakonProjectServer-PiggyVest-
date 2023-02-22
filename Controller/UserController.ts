import { Request,Response } from "express";
import UserModel from "../Model/User.Model";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import WalletModel from "../Model/History.Model";
import mongoose from "mongoose";


// Register User
export const RegisterUser = async(req:Request,res:Response)=>{

    try {
        const {name,email,password,userName,phoneNumber} = req.body;

        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password,salt)

        const dater = Date.now();
         
        let num = 234

        const generateNumber = Math.floor(Math.random()* 80) + dater 

        const register = await UserModel.create({
            name,
            email,
            userName,
            password:hash,
            phoneNumber:num - phoneNumber,
            verified:true,
            accountNumber: generateNumber
        })

        const createWallet = await WalletModel.create({
            // SO THAT THE USER ID AND THE ID IN THE WALLET WILL BE UNIQUE
            _id:register?._id,
            Balace:1000,
            credit:0,
            debit:0,

        })
        register?.wallet.push(new mongoose.Types.ObjectId(createWallet?._id))
        register.save()

        return res.status(200).json({
            message:"Successfully Registered User",
            data:register,
            // token:jwt.sign((_id:register._id),"hbub-by73-7317rgh-hvytuvef")
            token:jwt.sign({id:register._id},"by8vg24fbb2b uibv9ruvb4 ubv2u4vb2")
        })
    } catch (error) {
        return res.status(404).json({
            message:"An Error Occurred",error
        })
    }
}

// TRANFER TO ANOTHER WALLET
export const MakeTranfer = async(req:Request,res:Response)=>{
    try {
        
        
    } catch (error) {
        return res.status(404).json({
            message:"An Error Occurred {Couldn't Transfer}",error
        })
    }
}