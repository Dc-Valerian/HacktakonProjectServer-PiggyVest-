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

        

        const generateNumber = Math.floor(Math.random()* 9876543210) 

        const register = await UserModel.create({
            name,email,userName,password:hash,phoneNumber,verified:true,accountNumber: generateNumber
        })
    } catch (error) {
        return res.status(404).json({
            message:"An Error Occurred",error
        })
    }
}