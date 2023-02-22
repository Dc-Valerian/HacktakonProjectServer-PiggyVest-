import { Request,Response } from "express";
import UserModel from "../Model/User.Model";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


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
            phoneNumber:num +  phoneNumber,
            verified:true,
            accountNumber: generateNumber
        })
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